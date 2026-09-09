
### Linear Solver Parameters

Next is to specify the parameters of the linear solver. Part of the process of numerically solving the equations of fluid mechanics involves forming a very large system of linear algebraic equations. This system of equations is too large to solve directly, so an approximate numerical solution is required. The type and settings for the linear solver can have dramatic impacts on the performance and accuracy of the simulation. More detailed information about the different linear solvers and their settings included in *svMultiPhysics* can be found ***LINK_TBD***. For this simple example, we cover just the basics to get an idea of what each setting does. Linear solver settings are specified in a subsection in the `<Add_equation>` section:

    <Add_equation type="fluid">   
        
        ...
    
        <LS type="NS">
            <Max_iterations>10</Max_iterations>
            <Tolerance>1e-4</Tolerance>
            <Krylov_space_dimension>50</Krylov_space_dimension>
            <NS_GM_max_iterations>5</NS_GM_max_iterations>
            <NS_GM_tolerance>1e-4</NS_GM_tolerance>
            <NS_CG_max_iterations>500</NS_CG_max_iterations>
            <NS_CG_tolerance>1e-4</NS_CG_tolerance>
            <Linear_algebra type="fsils">
                <Preconditioner>fsils</Preconditioner>
            </Linear_algebra>
        </LS>

This simulation utilizes the specialized “NS” linear solver, which is specialized for rigid wall simulations in *svMultiPhysics*. First, we consider all the “tolerance” parameters which each specify the acceptable amount of error in each stages of the linear solver. The approximate solutions to the linear system can only be solved up to a tolerance. As the value of the tolerance is decreased, the accuracy of the computed solution will increase but it will take more time to solve for the solution. For linear solvers with multiple tolerances like this, using the same tolerance for all steps is recommended. We use a tolerance of 0.0001 for this simulation which gives fairly accurate results for a reasonable cost in cardiovascular settings.

The number of iterations specifies how many times the linear solver will iterate to find a solution. Linear solver algorithms require several iterations to reach their solution. The more the linear solver is allowed to iterate, the more accurate a solution it can find at additional computational cost. But increasing the number of iterations does not necessarily mean the cost will increase. If the linear solver is able to obtain a solution that satisfies the tolerance criteria before it reaches the maximum iterations, it will cut the iterations short and move to the next step. Increasing the maximum iterations only allows it to iterate more times if it needs to. Unless your simulation is having trouble converging, we recommend keeping the number of iterations at their default values.