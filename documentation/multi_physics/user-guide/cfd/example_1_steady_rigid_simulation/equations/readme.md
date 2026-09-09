
### Defining Equations and Fluid Properties

The next step to running an *svMultiPhysics* simulation is to establish the type of equation that will be solved and to define all material properties needed. This is done in the top part of the `<Add_equation>` section of the .xml file:

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

A pure fluids simulation like this example only requires a solution to the “fluid” equation, which is specified in the `<Add_equation>` XML command. The fluid equation only requires three properties to be defined: (1) fluid density, (2) fluid viscosity, and (3) backflow stabilization coefficient. The fluid density is assumed to be $1 \ g/cm^3$. Note that all numerical parameters in the .xml file are assumed to be consistent with each other, which should be consistent with the unit of measure established in the mesh. Based on the input mesh data for this example, we are using the CGS unit of measure. The fluid viscosity is defined within its own block where users are also able to select the viscosity model. For this simulation, we use a simple constant viscosity model with a value of $0.04 \ Poise$ for simplicity. Blood flow in the large arteries like this model can be safely assumed to be Newtonian with a constant viscosity. Blood is considered to be a non-Newtonian fluid, but the non-Newtonian behavior is typically only observed in the microvasculature where the diameter of the vessel becomes comparable to the size of the blood cells. The backflow stabilization coefficient is a parameter unique to the *svMultiPhysics* flow solver and should be kept at $0.3$.

The other parameters in this section specify settings for the nonlinear solution of the fluids governing equations. `<Min_iterations>` and `<Max_iterations>` specify how many nonlinear iterations you wish the solver to perform in each timestep. Specifying a larger amount of iterations can help the solver converge on a solution at the cost of additional simulation time. `<Tolerance>` defines the threshold for the solution residual needed for the solver to reach convergence. If the solver achieves a solution residual at or below the tolerance, it can move onto the next timestep before reaching the maximum nonlinear iterations. Making the tolerance a smaller number will produce more accurate simulation results at the cost of additional simulation time, and vice-versa for increasing the tolerance.