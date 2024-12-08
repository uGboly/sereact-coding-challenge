# Code Challenge

This document summarizes the implementation of the required tasks for the code challenge.

---

## Project Structure

The project follows a modular structure with distinct directories for backend, components, and Redux logic:

```
backend
    server.js          # Node.js backend for JSON-RPC over HTTP
    wsserver.js        # Node.js WebSocket backend for JSON-RPC
src
│  App.js             # Main entry point for the React app
│  index.css          # Tailwind CSS setup
│  index.js           # React root rendering
│
├─components
│      Counter.js      # Simple Redux counter
│      Counter2.js     # Counter with HTTP backend
│      Counter3.js     # Counter with WebSocket backend
│      Sphere.js       # Sphere component with Three.js
│
└─redux
        counterSlice.js       # Reducer for local counter
        counter2Slice.js      # Reducer for HTTP-based counter
        counter3Slice.js      # Reducer for WebSocket-based counter
        sphereSlice.js        # Reducer for sphere radius management
        store.js              # Redux store configuration
```
---

## Implementation Breakdown

1. **Counter App with React and Redux**:
   - Created `Counter.js` to manage a simple counter using Redux.
   - Used `counterSlice.js` for state management and configured `store.js`.

2. **Counter with JSON-RPC API over HTTP**:
   - **Backend**: Built `server.js` with Express to handle `increment`, `decrement`, and `getCounter` requests.
   - **Frontend**: Implemented `Counter2.js` using Axios and `counter2Slice.js` with `createAsyncThunk`.

3. **Counter with JSON-RPC API over WebSocket**:
   - **Backend**: Built `wsserver.js` using the `ws` library for WebSocket-based counter operations.
   - **Frontend**: Developed `Counter3.js` and `counter3Slice.js` with WebSocket communication (e.g., `initWebSocket`, `incrementAsync`).

4. **Tailwind CSS Styling**:
   - Styled components using Tailwind CSS for a modern, responsive layout.
   - Created a two-column layout in `App.js` with counters on the left and the sphere on the right.

5. **Display Sphere in Three.js**:
   - Used `@react-three/fiber` in `Sphere.js` to render a 3D sphere.
   - Added lights and a dynamically updated `radius` prop.

6. **Set Sphere Radius via JSON-RPC**:
   - **Backend**: Enhanced `wsserver.js` to support `set_radius` and `get_radius`.
   - **Frontend**: Updated `Sphere.js` and `sphereSlice.js` to handle radius updates via WebSocket thunks.
