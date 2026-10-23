## Example 2: Unsteady Simulation with RCR Outlet Boundary Conditions

This example models unsteady blood flow using a time-varying inlet flow rate and RCR outlet boundary conditions modeling the impedance of the vasculature downstream of the 3D model. As with Example 1 we use face labels to define an inflow and two outflow RCR boundary conditions as

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> Face name </th>
    <th> Boundary condition </th>
    <th> Value </th>
  </tr>
  <tr>
    <td>cap_aorta </td>
    <td>Unsteady</td>
    <td>cap_aorta.flow</td>
  </tr>
  <tr>
    <td>cap_aorta_2 </td>
    <td>RCR </td>
    <td> 332.47 1e-4  2992.2  </td>
  </tr>
  <tr>
    <td>cap_right_iliac</td>
    <td>RCR </td>
    <td>269.45 1e-4 2425.1 </td>
  </tr>
</table>

