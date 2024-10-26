
<h2> Generalized-alpha time integration </h2>
    
Consider a general system of nonlinear ordinary differential equations (ODEs),

$$
    \dot{\boldsymbol{u}} = \boldsymbol{f}\left(\boldsymbol{u}\right). \label{eqn_general_ode}
$$

This equation can also be written in residual form as 

$$
    \boldsymbol{R}\left(\dot{\boldsymbol{u}}, \boldsymbol{u}\right) = \boldsymbol{0}, \label{eqn_general_ode_residual}
$$

where the residual is defined by moving all terms in \eqref{eqn_general_ode} to the left-hand side of the equation, such that $\boldsymbol{R}\left(\dot{\boldsymbol{u}}, \boldsymbol{u}\right) := \dot{\boldsymbol{u}} - \boldsymbol{f}\left(\boldsymbol{u}\right)$. Our goal is to temporally discretize this system and solve for the solution variables, $\dot{\boldsymbol{u}}_{n+1}$ and 