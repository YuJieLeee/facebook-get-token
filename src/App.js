import { useEffect, useState } from "react";

import "./App.css";

function initFbSdk() {
  window.fbAsyncInit = function () {
    // 初始化 Facebook SDK
    window.FB.init({
      appId: "886324872822608",
      cookie: true,
      xfbml: true,
      version: "v19.0",
    });

    console.log("[fbAsyncInit] after window.FB.init");

    // 取得使用者登入狀態
    window.FB.getLoginStatus(function (response) {
      console.log("[refreshLoginStatus]", response);
      console.log("token in init", response?.authResponse?.accessToken);
    });

    window.FB.AppEvents.logPageView();
  };
}

function loadFbSdk() {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs?.parentNode?.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

function App() {
  const [token, setToken] = useState("");

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        console.log("handleFBLogin", response);
        setToken(response?.authResponse?.accessToken || "");
      },
      {
        scope:
          "pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata",
      }
    );
  };

  useEffect(() => {
    initFbSdk();
    loadFbSdk();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button onClick={handleFBLogin}>Get Token</button>
      <input value={token} />
    </div>
  );
}

export default App;
