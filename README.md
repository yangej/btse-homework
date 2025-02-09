# 專案展示
| 影片 | 圖片 |
| ---- | ---- |
|   <img style="width: 350px" src='https://github.com/user-attachments/assets/93e9a22d-f761-4e39-9f34-32005b07d489' alt='demo video' />   |  <img style="width: 353px" src="https://github.com/user-attachments/assets/b85647fc-04a5-4878-b38b-e1d399f1a83a" alt="demo image" />    |


# 專案架構
```
📦 btse-homework
├── 📂 src
│ ├── 📂 modules
│ │ ├── 📂 moduleA
│ │ │ ├── 📂 components
│ │ │ ├── 📂 hooks
│ │ │ ├── 📂 types
│ │ │ ├── 📂 utils
│ │ ├── 📂 ... (other modules)
│ ├── 📂 mocks
│ ├── 📂 theme
│ ├── 📄 App
├── 📄 .gitignore
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 eslint.config.js
├── 📄 README.md
└── ... config files
```

# 技術採用
- framework: React.js
- language: TypeScript
- css-in-js: styled-components

# 設計說明
- web socket 連線
  - 本專案有兩條不同的連線，所以抽象了一層 `useWebSocket` 來實作連線邏輯，在 `useWebSocket` 裡：
    - 在 effect mounted 時會根據傳入的 `endpoint` 建立 `WebSocket` 實體，並存入 ref（`instanceRef`）以供元件內部其他 function 使用
    - 在 effect unmount 時會把連線關閉，以避免不必要的連線
    - 若不幸遇到連線中斷，這邊採用 Exponential backoff 的方式來嘗試重連
      - 設定了一個 threshold（`MAX_RECONNECT_ATTEMPTS`）限制嘗試次數，一旦超過就不再重連
      - 設定了一個上限（`MAX_RECONNECT_DELAY`）來阻止過長的等待時間，由於 timer 的 delay 是 exponentially increase，有可能會在幾次嘗試後就變得過大
    - 提供 `subscribe` 和 `unsubscribe` 兩個 methods 來訂閱/解除訂閱 channel
      - 這邊會直接指定 `op` 值是因為本專案只會用到這兩種，所以就沒有用較抽象的方式供使用端自行指定
    - 提供 `message` 這個 state 來接收 WebSocket 傳來的 message，供使用端自由解析字串，將其轉為 JSON 物件使用
    - 提供 `ready` 這個 state 來定義連線狀態，會在 opened 的時候為 `true`、closed 的時候為 `false`
  - 將所有 web sockets 收集到 context（`WebSocketContext`）裡，以供 `App` 底下的所有 components 使用
- 資料串接
  - order book：抽一個 `useOrderBook` 的 hook 來負責接收 web socket 的資料。在這個 hook 裡我們會去訂閱 order book 並且持續接收、更新本地的 cache 資料。
    - 抽一個 `useOrdersData` 來針對 API 回傳的 order book 的資料修改本地 cache 的資料
      - 由於畫面上 size 的欄位需要根據上一次的結果來決定顯示的狀態，所以除了 API 回傳的 `{ price, size }` 以外，會多加一個 `prevSize` 的欄位紀錄上一次的 size
      - 另外畫面上 total 的欄位有一個 percentage bar 顯示邏輯是：**Current quote accumulative total size / Total quote size of buy or sell**，會需要所有資料的 size 加總，所以也多一個 `total` 的欄位
    - order book incremental updates 的 API 文件有提到 `seqNum` 永遠會大於 `prevSeqNum`，若接收到不合條件的資料就要解除訂閱（`webSocket.subscribe`）並重新訂閱（`webSocket.unsubscribe`）
    - order book API 回傳的資料會在第一次回傳 50 筆記錄後，後需都會回傳資料的 diff，所以需要在本地自己維護一份 cache，根據新回傳的資料來更新，這邊選用 map 來實作 cache（見 `useOrdersData`），原因是：
      - map 的好處是在新資料回來的時候，我們可以用 `O(1)` 的時間複雜度增刪改 cache 資料；壞處是畫面要顯示時每次資料更新都要轉換成 array 並進行排序
      - array 的好處是第一次資料回傳後只需要排序後就可以使用；壞處是後續增刪需要 `O(log(n)) + O(n)` 的時間複雜度
      - 權衡之下覺得 map 的實作較為簡潔，且後續如果有其他地方需要讀取資料來顯示，map 會是比較容易讀取並轉換的資料格式
  - latest price：抽一個 `useLatestTradePriceRecord` 的 hook 來負責接收 web socket 的資料。在這個 hook 裡我們會去訂閱 trade history 並取第一個資料作為 latest price。
    - latest price 相較起來就比較單純，只需要持續更新 price 的紀錄即可
    - 由於畫面上需要根據最新資料（`currPrice`）和上一次相比來顯示不同狀態，所以還需要多紀錄上一筆資料（`prevPrice`）才可以達成
    - SPEC 上沒有定義什麼情境下要將狀態轉為持平，所以我這裡擅自用同樣的資料接收到一定的次數（`SAME_PRICE_THRESHOLD`）後就讓 `prevPrice` 更新成 `currPrice`
- 畫面顯示
  - 區塊
    - 上半部：ask orders
    - 中間：last price
    - 下半部：bid orders
  - order list
    - ask orders（`displayedAsksData`）
      - 遞減排序
      - 只取最大的前 8 筆
      - total 欄位是從第 8 筆回加到第 1 筆的 size（見 `getAsksOrderBookTableData`）
    - bid orders（`displayedBidsData`）
      - 遞減排序
      - 只取最大的前 8 筆
      - total 欄位是從第 1 筆累加到第 1 筆的 size（見 `getBidsOrderBookTableData`）
  - order in order list
    - 沒有出現在 order book 過的 order，整條 row 要加上底色
      - 在 table component 紀錄第一次出現在 order book 的 bid orders 和 ask orders（見 `useNewOrderSet`），在渲染 order 時拿對應的 set 來比對是否為第一次出現的 price
    - 出現在 order book 上的 order 若 size 有變動，size 欄位要加上底色
      - 拿先前在 order book cache 裡另外加上的 `prevSize` 和當筆資料的 `size` 做比對
    - total 欄位底下需要墊一條 percentage bar，最長長度是 total 欄位的寬度
      - 拿先前在 `useOrdersData` 計算的 total 欄位和當筆資料的 total 計算長度
      - 為了優化渲染效能，這邊不直接拿 percentage 作為 bar 的長度，而是用 100% - percentage 來計算 bar 的位移（`translateX`），讓長度更新只觸發畫面 re-paint
  - last price
    - 持平、變大、變小都要顯示對應的顏色，這邊就用先前在 `useLatestTradePriceRecord` 存放的 `current` 和 `previous` 來做比對
