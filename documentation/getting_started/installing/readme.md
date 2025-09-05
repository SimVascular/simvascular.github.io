# Installing SimVascular 

The SimVascular application is distributed using installers downloaded from the <a href="https://simtk.org/frs/?group_id=188"> SimTK SimVascular Downloads </a> website. Installers are provided for the following platforms

<ul style="list-style-type:none;">
  <li> <b> Ubuntu 22 </b> - Intel 64-bit architecture (x86_64) </li>
  <li> <b> Ubuntu 24 </b> - Intel 64-bit architecture (x86_64) </li>
  <li> <b> MacOS Ventura </b> - ARM 64-bit architecture (Silicon) </li>
  <li> <b> MacOS Ventura </b> - Intel 64-bit architecture (x86_64) </li>
  <li> <b> Windows 11 </b> - Windows Subsystem for Linux (WSL) Ubuntu 24 </li>
</ul>

The SimVascular application uses the <a href="https://www.mitk.org/wiki/The_Medical_Imaging_Interaction_Toolkit_(MITK)"> Medical Imaging Interaction Toolkit (MITK)<a/> framework for medical imaging applications incorporating a plugin architecture. This framework uses several software packages
<ul style="list-style-type:none;">
  <li> <b> MITK </b> - Medical imaging plugin framework </li>
  <li> <b> Qt6 </b> - GUI </li>
  <li> <b> VTK </b> - Graphics and visualization </li>
  <li> <b> ITK </b> - Image processing </li>
  <li> <b> Python </b> - Embedded Python environment </li>
  <li> <b> HDF5 </b> - Hierarchical Data Format Version 5 </li>
</ul>

All of these software packages are built from source for each platform and depend on the versions of libraries they are built against. The SimVascular application is then built with these software packages. Running SimVascular on a platform it was not specifically built for can fail due to missing libraries or incompatible library versions.

Running SimVascular requires that C++ and graphics libraries (e.g. OpenGL) be installed. It is difficult to get SimVascular running on an HPC cluster because of the graphics library requirements and other required software, local and remote, needed to view graphics images created remotely. 

Other platform-specific libraries may also be required. The notes under each SimVascular installer describe which additional libraries need to be installed.

### Ubuntu 
Most Ubuntu workstations will have the required C++ and graphics libraries installed. Ubuntu uses OpenGL and the X Window System (X11) for graphics. The Qt software package uses several X protocol C-language Binding (XCB) libraries that may not be installed by default. These libraries can be installed using
<pre>
    sudo apt install '^libxcb.*-dev' libx11-xcb-dev 
</pre>

If SimVascular fails at start-up then running it from the command-line will show a message explaining which library can't be found. You can then install the missing library using 

<pre>
    sudo apt install MISSING_LIBRAY_NAME
</pre>


### MacOS 
MacOS does not come with C++ libraries fully installed by default. The libraries are installed by installing the Xcode Command Line Tools 
by running the following command in a terminal 
<pre>
    xcode-select --install 
</pre>

The latest versions of SimVascular now require that the <a href="https://www.openmp.org/"> OpenMP </a> library be installed for shared-memory multiprocessing. It can be installed using
<pre>
    brew install libomp 
</pre>

If SimVascular fails at start-up then running it from the command-line will show a message explaining which library can't be found. You can then install the missing library using

<pre>
    brew install MISSING_LIBRAY_NAME 
</pre>



### Windows 
There is currently no native Windows 11 release of the latest version of SimVascular. However, SimVascular can be run on a Windows 11 computer in an Ubuntu 24 terminal using <a href="https://learn.microsoft.com/en-us/windows/wsl"> Windows Subsystem for Linux (WSL) </a>. The SimVascular application runs just as fast as a native Windows build. You can also run all of the SimVascular solvers there using all of the processors of your Windows computer. The following steps describe how to install SimVascular and set up your Ubuntu environment to run it.

<strong> Download and install SimVascular </strong><br>
After you have created a WSL user account a terminal will open to your Ubuntu home directory. You will then can download the SimVascular-Ubuntu-24-2025.08.25.deb installer from a browser and move it to your Ubuntu home directory (your Ubuntu home directory can be seen from the Windows File Explorer app).

Run the following command in your Ubuntu terminal to install SimVascular
<pre>
    sudo dpkg -i SimVascular-Ubuntu-24-2025.08.25.deb
</pre>

This will install SimVascular in
<pre>
    /usr/local/sv/simvascular/2025-08-25
</pre>

<strong> Install additional libraries </strong><br>
To set up your Ubuntu environment run the following commands in your terminal 
<pre>
    sudo apt update

    sudo apt install build-essential

    sudo apt install '^libxcb.*-dev' libx11-xcb-dev libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev libxkbcommon-x11-dev

    sudo apt install libnss3 libwebp-dev libharfbuzz-dev libsm6  libxkbfile-dev
</pre>

You should now be able to run SimVascular using 
<pre>
    /usr/local/sv/simvascular/2025-08-25/simvascular
</pre>


