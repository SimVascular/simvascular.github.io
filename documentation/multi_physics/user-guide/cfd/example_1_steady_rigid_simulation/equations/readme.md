
### Adding the equation to solve

The `<Add_equation>` section of `solver.xml` specifies the governing equation and its physical properties, boundary conditions, output settings, and numerical solution parameters. Setting `type="fluid"` selects the incompressible Navier-Stokes equations.


The `<Add_equation>` section used for a steady simulation is: 

    <Add_equation type="fluid">

        <Coupled>true</Coupled>

        <Min_iterations>1</Min_iterations>

        <Max_iterations>10</Max_iterations>

        <Tolerance>1e-4</Tolerance>

        <Backflow_stabilization_coefficient>0.3</Backflow_stabilization_coefficient>

        <Density>1</Density>

        <Viscosity model="Constant">
            <Value>0.04</Value>
        </Viscosity>

For this simulation, the `<Add_equation>` section specifies a fluid density of $1\ \mathrm{g/cm^3}$, a `Constant` viscosity of $0.04\ \mathrm{Poise}$, and a backflow stabilization coefficient of $0.3$ to help control flow reversal at outlet boundaries. This Newtonian, constant-viscosity approximation is appropriate for the large arteries modeled here, although blood can exhibit non-Newtonian behavior. The mesh coordinates and dimensional input values use a consistent centimeter-gram-second (CGS) system of units in this example.

`<Min_iterations>` and `<Max_iterations>` bound the nonlinear iterations within each time step, while `<Tolerance>` specifies a relative residual stopping criterion. A smaller tolerance can require more work, but does not by itself guarantee a more accurate physical solution. Reaching the maximum iteration count does not establish that the tolerance was satisfied. For more information about residuals and convergence, see [Simulation Results Output](https://simvascular.github.io/documentation/multi_physics.html#run_simulation_output).
