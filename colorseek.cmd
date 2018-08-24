@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\colorseek" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\colorseek" %*
)