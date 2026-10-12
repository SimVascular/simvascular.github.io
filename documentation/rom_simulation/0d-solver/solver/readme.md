# 0D Solver

Zero-dimensional (0D) models are lightweight methods to simulate bulk hemodynamic quantities in the cardiovascular system. Unlike 3D and 1D models, 0D models are purely time-dependent; they are unable to simulate spatial patterns in the hemodynamics. 0D models primarily simulate bulk cardiovascular flow rates and pressures; however, they can simulate other hemodynamic quantities, such as wall shear stress or volume, as well. Furthermore, 0D models are highly modular and compartmentalized, meaning different regions of the 0D models represent the hemodynamics in different parts of the cardiovascular anatomy being modeled.

0D models are analogous to electrical circuits. The flow rate simulated by 0D models represents electrical current, while the pressure represents voltage. Three primary building blocks of 0D models are resistors, capacitors, and inductors. Resistance captures the viscous effects of blood flow, capacitance represents the compliance and distensibility of the vessel wall, and inductance represents the inertia of the blood flow. Different combinations of these building blocks, as well as others, can be formed to reflect the hemodynamics and physiology of different cardiovascular anatomies.

svZeroDSolver is an application for performing 0D simulations of cardiovascular flows. Some noteworthy features of svZeroDSolver are:

<ul style="list-style-type:disc;">
<li> It is completely modular. Users can create custom flow models by arranging blocks corresponding to blood vessels, junctions, different types of boundary conditions, etc. </li>
<li> It is written in C++ to enable high-performance applications and can be run as a C++ executable. 
<Li> A C++ shared library is also built that can be used to interface with other Python or C++-based applications. This allows svZeroDSolver to be used in a fully coupled manner from other C++ solvers, and for parameter estimation, uncertainty quantification, etc. 
</li>
<li> The C++ code is wrapped for Python so it can be run from a Python script using a Python API. It can can be downloaded from 
PyPi using <b>pip install svzerod</b>.
<li> The svZeroDCalibrator application, which is included in svZeroDSolver, optimizes 0D blood vessel parameters to recapitulate given time-varying flow and pressure measurements (for example, from a high-fidelity 3D simulation). This allows users to build accurate 0D models that reflect observed hemodynamics. </li>
<li> The svZeroDVisualization application enables users to visualize their 0D network and interactively select nodes to view simulation results. </li>
<li> The svZeroDGUI application allows users to generate input files for svZeroDSolver by drawing the network on an easy-to-use GUI. This provides an alternative to manually creating files and is useful for users without access to a 3D model. </li>
</ul>

## Blocks

The modular architecture of svZeroDSolver relies on "blocks", such as blood vessels, junctions, valves, boundary conditions, etc. Users can assemble and connect these blocks together in a variety of ways to create extensive and customizable 0D circulation models.   

The main categories of blocks implemented in svZeroDSolver are:

<ul style="list-style-type:disc;">
<li> Blood vessels </li>
<li> Junctions </li>
<li> Boundary conditions </li>
<li> Heart chambers </li>
<li> Heart valves </li>
</ul>

An overview of all currently implemented blocks can be found [here](https://simvascular.github.io/svZeroDSolver/class_block.html). This collection of building blocks allows to model extensive and complex vascular networks. Many examples of vascular networks can be found [here](https://github.com/simvascular/svZeroDSolver/tree/master/tests/cases). The assembly of these blocks is specified in the `.json` configuration file. The <a href="#0d-solver-user-guide">User Guide</a> below provides details.

We are always interested in adding new blocks to expand the funcitonality of svZeroDSolver. For developers interested in contributing, please read the [Developer Guide](https://simvascular.github.io/svZeroDSolver/developer_guide.html). 
