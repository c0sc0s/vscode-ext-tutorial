import * as vscode from "vscode";

//入口函数
export function activate(context: vscode.ExtensionContext) {
  const provider = new MyWebviewViewProvider(context.extensionUri);
  //注册视图
  const registerCleaner = vscode.window.registerWebviewViewProvider(
    "myView",
    provider
  );

  //注册清除资源
  context.subscriptions.push(registerCleaner);
}

//webview Provider
class MyWebviewViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  // vscode 会调用这个函数
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My WebView</title>
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
      </html>`;
  }
}
