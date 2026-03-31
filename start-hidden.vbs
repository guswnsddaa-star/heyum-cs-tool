Set shell = CreateObject("WScript.Shell")
currentDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
command = "cmd /c cd /d """ & currentDir & """ && ""C:\Program Files\nodejs\node.exe"" server.mjs"
shell.Run command, 0, False
