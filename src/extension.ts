'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const scheme = "btungit";
const previewUri = vscode.Uri.parse(`${scheme}://view`);

class UngitViewProvider implements vscode.TextDocumentContentProvider {
    
    onDidChange?: vscode.Event<vscode.Uri>;
    
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        const location = vscode.workspace.rootPath || "";
        const url = `http://localhost:8448/#/repository?path=${location}`;
        return `
        <div style="position: fixed; height: 100%; width: 100%; margin-left: -20px;">
            <iframe src="${url}" style="border: none;" height="100%" width="100%"></iframe>
        </div>
        `;
    }
    
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "btvsungitview" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.btvgit', () => {
        vscode.commands.executeCommand("vscode.previewHtml", previewUri, vscode.ViewColumn.Two, "Git View").then(() => {
            return;
        }, (reason: string) => {
            vscode.window.showErrorMessage(reason);
        });
    });

    let provider = new UngitViewProvider();

    vscode.workspace.registerTextDocumentContentProvider(scheme, provider);

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}