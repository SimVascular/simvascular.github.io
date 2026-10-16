
### Linear Solver Parameters

Part of the process of numerically solving the equations of fluid mechanics involves forming a very large system of linear algebraic equations. For large three-dimensional CFD problems, direct solvers can require prohibitive amounts of memory and computation, so this example uses an iterative linear solver to obtain an approximate solution. The type and settings for the linear solver can have dramatic impacts on the performance and accuracy of the simulation. More detailed information about the different linear solvers and their settings included in *svMultiPhysics* can be found in the [linear-solver reference](https://simvascular.github.io/documentation/multi_physics.html#linear_solver_parameters). For this simple example, we cover just the basics to get an idea of what each setting does. Linear solver settings are specified in a subsection in the `<Add_equation>` section:

    <Add_equation type="fluid">   
        
        ...
    
        <LS type="NS">
            <Linear_algebra type="fsils">
                <Preconditioner>fsils</Preconditioner>
            </Linear_algebra>
            <Max_iterations> 10 </Max_iterations>
            <Tolerance> 0.4 </Tolerance>
            <Krylov_space_dimension> 50 </Krylov_space_dimension>
            <NS_GM_max_iterations> 200 </NS_GM_max_iterations>
            <NS_GM_tolerance> 0.01 </NS_GM_tolerance>
            <NS_CG_max_iterations> 500 </NS_CG_max_iterations>
            <NS_CG_tolerance> 0.02 </NS_CG_tolerance>
        </LS>

This simulation utilizes the **NS** linear solver which was developed for the specialized boundary conditions used for blood flow simulations. First, we consider all the *tolerance* parameters, which specify the acceptable amount of error at each stage of the linear solver. The approximate solutions to the linear system can only be solved up to a tolerance. Decreasing the tolerance generally improves the accuracy of the computed linear-system solution but may increase computation time. Separate tolerances are specified for the specialized NS linear solver as a whole, its GMRES component, and its conjugate-gradient component. In this example, these tolerances are set to 0.4, 0.01, and 0.02, respectively.

The maximum number of iterations specifies how many times the linear solver may iterate to find a solution. Linear solver algorithms require several iterations to reach their solution. Additional iterations can improve the accuracy of the linear-system solution, but beyond a certain point, the improvement may not justify the computational cost. A convergence tolerance allows the solver to stop when the residual is sufficiently small, avoiding unnecessary iterations. Increasing the maximum number of iterations does not necessarily increase computational cost, because the solver stops once the tolerance criterion is satisfied.
