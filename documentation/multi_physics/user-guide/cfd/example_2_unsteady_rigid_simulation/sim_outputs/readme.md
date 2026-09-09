
### Checking Unsteady Simulation Outputs

Once the simulation finishes, we can load the results into Paraview. Since *svMultiPhysics* saved a separate .vtu file for each timestep, we need to load the entire *stack* of results into Paraview. Click “Open” in Paraview then navigate to the folder where your results are saved. You should notice that all of your `results_*.vtu` files are grouped together. You can click the down arrow to expand the list and open individual files, but for our case we would like to load them all as a stack. Click on the header for the results then click “OK” to load them all.

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_load_stack.png">
  <figcaption class="svCaption" >Loading a stack of .vtu results in Paraview.</figcaption>
</figure>

Click “Apply” on the left hand side to load all of the data. By default, *svMultiPhysics* results load in as a `Solid Color’. Just like the previous example, you can view different result fields like the velocity and pressure by selecting them from the dropdown menu at the top. It is once again a good idea to verify general solution characteristics of the pressure and velocity fields before continuing. Your simulation results are shown in the 3D viewer one timestep at a time. Results at a different timestep can be viewed by using the time bar near the top of the screen:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_time_bar.png">
  <figcaption class="svCaption" >Selecting different timesteps to view results in Paraview.</figcaption>
</figure>

Since we saved our results every $10$ timesteps, we have a total of $100$ result files per cycle. You can manually select the index of the result field you want to look at, or use the arrow buttons on the left. Observing the results at different timesteps should show the velocity and pressure fields evolving with time as the boundary conditions change. Often, it can be helpful to display the velocity and pressure fields at certain key points in the cardiac cycle (i.e. at peak systole or mid diastole) when performing analysis.

It can also be useful to make line plots of certain simulation outputs over time. To do this, we will make use of “Filters” within Paraview which allow for manipulating and analyzing .vtu data. Paraview offers many useful filters for analyzing simulation outputs like clipping, slicing, integrating, vector glyphs, streamlines, and more. More information about the filters in Paraview can be found in their documentation. For this example, we will focus on the filter called “Plot Selection Over Time” which will allow us to select a point on the model and plot all simulation outputs at that point over time. At the top of the Paraview window, click the menu option for “Filters”. You will have the option of either searching for the filter by name or seeing the full list by alphabetical order. Find the “Plot Selection Over Time” filter to add it to your window.

Now, we need to select the part of the 3D model where we want to plot the results over time. Left-click anywhere in the 3D viewer then hit `d` on your keyboard to enter selection mode. The mouse cursor should change to a “+” to indicate your switch. You can now click on anywhere in the model to select a point, but for this example let’s select one of the outlet caps so we can observe the velocity and pressure at the outlets. Select a point as close to the middle of the cap as possible which is where we expect the maximum velocity to be:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_selection_point.png">
  <figcaption class="svCaption" >Selecting a point for plotting in Paraview.</figcaption>
</figure>

The selected point should highlight purple to show where you have selected. This point will now act like a probe and record simulation output data at that point for all times. Return to the left-hand side of the screen to the “PlotSectionOverTime” filter then hit “Apply” to apply the filter. It may take a few moments for Paraview to compile all the data. There is a progress bar in the bottom of the screen which can show you what Paraview is working on at the moment. Once it completes, a line graph should appear on the right-hand side of the 3D viewing window which should show the pressure, velocity, and wall shear stress at that point as a function of time:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_time_plot.png">
  <figcaption class="svCaption" >Plotting simulation outputs at a point over time.</figcaption>
</figure>

Note that the plot only has a single vertical axis, so outputs with much smaller magnitudes like the velocity and wall shear stress may not be viewable initially. You can change which outputs appear in the graph by selecting them from a menu on the bottom-left of the screen. Note that the pressure at this outlet changes with time due to our unsteady boundary conditions. It can also be helpful to export the data from this graph to a file for further analysis and plotting. To do this, click on either the “Split Horizontal Axis” or “Split Vertical Axis” buttons on the top right of the line graph. This will open a new window for you to create a new view. Select “Spreadsheet View” from the bottom of the list to show a data table of all results that were plotted with time. With this spreadsheet selected (there should be a faint blue border around the active window), go to “File > Save Data” then export the data to a .csv format. This .csv file can then be loaded into a spreadsheet program or MATLAB for further plotting and analysis.