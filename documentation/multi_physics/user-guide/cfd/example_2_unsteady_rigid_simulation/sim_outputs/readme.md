
### Visualizing Simulation Results 

Once the simulation finishes, load the saved VTK snapshots as a time series in ParaView. In this example, a snapshot is saved every ten solver time steps, not at every time step. Click “Open” in ParaView, and navigate to the results folder. The `results_*.vtu` files are grouped together; the down arrow expands the group to show individual files. Select the group header and click “OK” to load the complete series.

<figure>
  <img class="svImg svImgMd svImgCompact" style="width: auto; max-width: min(100%, 20em); max-height: 18em;" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_load_stack.png">
  <figcaption class="svCaption" >Loading a series of .vtu results in ParaView.</figcaption>
</figure>

Click “Apply” on the left-hand side to load the data. By default, the results are displayed with `Solid Color`. As in Example 1, select a result field such as velocity or pressure from the dropdown menu at the top, and inspect its general characteristics before continuing. The 3D view displays one results file at a time. The time bar near the top of the screen selects the displayed time point:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_time_bar.png">
  <figcaption class="svCaption" >Selecting saved time points to view results in ParaView.</figcaption>
</figure>

With results saved every $10$ time steps, the one-second cycle spans $100$ output intervals. Select a saved time point by its index or use the arrow buttons on the left. Observing successive snapshots shows how the velocity and pressure fields evolve during the cardiac cycle.

Line plots can also show how fields change over time. ParaView filters support operations such as clipping, slicing, integration, vector glyphs, and streamlines. The “Plot Selection Over Time” filter plots fields at a selected location across the saved time series. In the “Filters” menu, search for the filter by name or locate it in the alphabetical list.

Select a location in the 3D model for the time-history plot. Left-click in the 3D view and press `d` to enter selection mode; the cursor should change to a “+”. For this example, select a point on an outlet cap to inspect the local velocity and pressure. A point velocity is not the integrated flow rate through the outlet, and its pressure is not necessarily the outlet's surface-averaged pressure. Those quantities require a surface calculation or corresponding boundary-output history.

<figure>
  <img class="svImg svImgMd svImgCompact" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_selection_point.png">
  <figcaption class="svCaption" >Selecting a point for plotting in ParaView.</figcaption>
</figure>

The selected point should highlight purple. It acts as a probe of the loaded fields at that location across the saved time points. Return to the “Plot Selection Over Time” filter on the left-hand side, and click “Apply”. ParaView may take a few moments to process the series; progress is shown at the bottom of the screen. A line graph then displays the available fields such as pressure, velocity, and wall shear stress at the selected point as functions of time:

<figure>
  <img class="svImg svImgMd svImgCompact" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_paraview_time_plot.png">
  <figcaption class="svCaption" >Plotting simulation fields at a point over time.</figcaption>
</figure>

The plot initially uses a single vertical axis, so fields with smaller numerical magnitudes may be difficult to see. Select which fields appear using the menu at the bottom-left of the screen. The graph data can also be exported for further analysis. Click either “Split Horizontal” or “Split Vertical” at the top-right of the graph to create another view, then select “Spreadsheet View” to show the plotted data. Select the “Plot Selection Over Time” filter in the Pipeline Browser, then choose “File > Save Data” to export a CSV file. The exported CSV data can then be plotted and analyzed using spreadsheet software or a scientific computing environment.
