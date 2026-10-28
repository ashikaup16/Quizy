Option Explicit

Dim shell, fileSystem, projectDirectory, serverPath, attempt
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

projectDirectory = fileSystem.GetParentFolderName(WScript.ScriptFullName)
serverPath = fileSystem.BuildPath(projectDirectory, "server.js")

If Not IsQuizyRunning() Then
  shell.Run "cmd.exe /c node """ & serverPath & """", 0, False

  For attempt = 1 To 20
    WScript.Sleep 500
    If IsQuizyRunning() Then Exit For
  Next
End If

If IsQuizyRunning() Then
  shell.Run "http://localhost:8080", 1, False
Else
  MsgBox "Quizy could not start. Make sure Node.js is installed and port 8080 is available.", _
    vbExclamation, "Unable to open Quizy"
End If

Function IsQuizyRunning()
  Dim request
  IsQuizyRunning = False
  On Error Resume Next
  Set request = CreateObject("MSXML2.XMLHTTP")
  If Err.Number = 0 Then
    request.Open "GET", "http://127.0.0.1:8080/", False
    request.Send
    If Err.Number = 0 Then
      If request.Status = 200 Then
        IsQuizyRunning = (InStr(1, request.responseText, "<title>Quizy", vbTextCompare) > 0)
      End If
    End If
  End If
  Err.Clear
  Set request = Nothing
  On Error GoTo 0
End Function
