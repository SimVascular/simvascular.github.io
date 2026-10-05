<h2 id="tutorial_starting_simvascular"> Starting SimVascular </h2>

Once SimVascular has been <a href="#installing">installed</a>, it can be started
by selecting the <img src="/documentation/getting_started/tutorial/images/sv-start-icon.png" width="18" height="18"> icon from a
platform's list of applications (Fig. 1).

<figure>
  <img class="svImg svImgLg"  src="/documentation/getting_started/tutorial/images/sv-start.png">
  <figcaption class="svCaption"> Fig. 1 &nbsp Starting the SimVascular application. </figcaption>
</figure>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
The SimVascular GUI may look slightly different on macOS, Ubuntu, and Windows platforms.
</div>

<br>
On Ubuntu and Windows, a terminal is created in which SimVascular runs. Messages output by some SimVascular computations
(e.g., meshing) are written to the terminal. On macOS, no terminal is created, so these SimVascular messages can be seen only
if SimVascular is started from a terminal.

SimVascular can be started from the command line in a terminal using the path to the installation directory. The path
includes the SimVascular build date in <i>YYYY-MM-DD</i> format on Ubuntu and Windows.

<table class="table table-bordered" style="width:100%">
  <caption>Starting SimVascular from the command line</caption>
  <tr>
    <th> Platform </th>
    <th> Command </th>
  </tr>

  <tr>
    <td> macOS </td>
    <td> /Applications/SimVascular.app/Contents/Resources/simvascular </td>
  </tr>

  <tr>
    <td> Ubuntu </td>
    <td> /usr/local/sv/simvascular/YYYY-MM-DD/simvascular </td>
  </tr>

  <tr>
    <td> Windows (PowerShell) </td>
    <td> &"C:\Program Files\SimVascular\SimVascular\YYYY-MM-DD\sv.bat" </td>
  </tr>

</table>
