import * as vscode from 'vscode';
import "typescript";
import "./constants";

let myStatusBar : vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	const codeBoilerplateCommand = 'code-boilerplate.CodeBoilerplate';
	subscriptions.push(vscode.commands.registerCommand(codeBoilerplateCommand, () => {
		const documentFileType = vscode.window.activeTextEditor?.document.languageId;
		const documentFileName = vscode.window.activeTextEditor?.document.fileName;
		const documentFilePath = vscode.window.activeTextEditor?.document.fileName.split('/');

		if (documentFileType === "javascript") {
			vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), 'console.log("Hello World!")');
			});
		}
		else if (documentFileType === "python") {
            vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), 'print("Hello World!")');
			});
		}
		else if (documentFileType === "typescript") {
			vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), 'console.log("Hello World!");');
			});
		}
		else if (documentFileType === "csharp") {
			vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), 'using System;\n\nnamespace Program\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tConsole.WriteLine("Hello World!");\n\t\t}\n\t}\n}');
			});
		}
		else if (documentFileType === "c") {
			vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0,0), '#include <stdio.h>');
				editBuilder.insert(new vscode.Position(1,0), 'int main() {');
				editBuilder.insert(new vscode.Position(2,4), 'printf("Hello World!");');
				editBuilder.insert(new vscode.Position(3,4), 'return 0;');
				editBuilder.insert(new vscode.Position(4,0), '}');
			})
		}
		else if (documentFileType === "cpp") {
			return null;
		}
		else if (documentFileType === "java") {
			return null;
		}
		vscode.window.showInformationMessage("Code Boilerplate Generated! 🎉");
	}));

	myStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBar.command = codeBoilerplateCommand;
	subscriptions.push(myStatusBar);

	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBar.text = `$(new-file) Hello World!`;
	myStatusBar.show();
}

export function deactivate() {
	myStatusBar.dispose();
}