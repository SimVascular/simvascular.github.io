
<h2> Generalized-alpha time integration </h2>

Consider a general system of nonlinear ordinary differential equations (ODEs),

$$
\dot{\vc{u}} = \vc{f}\left(\vc{u}\right).
$$

This equation can also be written in residual form as 

$$
\vc{R}\left(\dot{\vc{u}}, \vc{u}\right) = \vc{0},
$$

where the residual is defined by moving all terms in the ODE to the left-hand side of the equation, such that $\vc{R}\left(\dot{\vc{u}}, \vc{u}\right) := \dot{\vc{u}} - \vc{f}\left(\vc{u}\right)$. Our goal is to temporally discretize this system and solve for the solution variables, $\dot{\vc{u}}_{n+1}$ and $\vc{u}_{n+1}$, at the next time step, $n+1$, given the solutions, $\dot{\vc{u}}_{n}$ and $\vc{u}_{n}$, at the current time step, $n$, for $n \in \left[0, N_{t} - 1\right]$, where $N_{t}$ is the total number of time steps. $\dot{\vc{u}}_{n=0}$ and $\vc{u}_{n=0}$ are given by the initial condition. Note that the ODE may be obtained by some spatially discretizing some partial differential equation with the finite element method. For example, the governing system of ODEs for the unsteady heat equation is

$$
\vc{R}\left(\dot{\vc{u}}, \vc{u}\right) = \vc{M}\dot{\vc{u}} + \vc{K}\vc{u} - \vc{F} = \vc{0}.
$$

To solve the residual form of the ODE, we will use the generalized - $\alpha$ method,

$$
\vc{R}\left(\dot{\vc{u}}_{n+\alpha_m}, \vc{u}_{n+\alpha_f}\right) = \dot{\vc{u}}_{n+\alpha_m} - \vc{f}\left(\vc{u}_{n+\alpha_f}\right) = 0,
$$

$$
\vc{u}_{n+1} = \vc{u}_{n} + \Delta t \dot{\vc{u}}_{n} + \gamma \Delta t \left(\dot{\vc{u}}_{n+1} - \dot{\vc{u}}_{n}\right),
$$

$$
\dot{\vc{u}}_{n+\alpha_m} = \dot{\vc{u}}_{n} + \alpha_{m} \left(\dot{\vc{u}}_{n+1} - \dot{\vc{u}}_{n}\right),
$$

$$
\vc{u}_{n+\alpha_f} = \vc{u}_{n} + \alpha_{f} \left(\vc{u}_{n+1} - \vc{u}_{n}\right).
$$

This method iteratively solves for $\dot{\vc{u}}_{n+1}$ and $\vc{u}_{n+1}$ with a single predictor step and multiple corrector steps.

