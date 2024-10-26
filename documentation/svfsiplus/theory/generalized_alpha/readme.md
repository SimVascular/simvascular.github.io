
<h2> Generalized-alpha time integration </h2>
    
Consider a general system of nonlinear ordinary differential equations (ODEs),

$$
    \dot{\boldsymbol{u}} = \boldsymbol{f}\left(\boldsymbol{u}\right). \label{eqn_general_ode}
$$

This equation can also be written in residual form as 

$$
    \boldsymbol{R}\left(\dot{\boldsymbol{u}}, \boldsymbol{u}\right) = \boldsymbol{0}, \label{eqn_general_ode_residual}
$$

where the residual is defined by moving all terms in \eqref{eqn_general_ode} to the left-hand side of the equation, such that $\boldsymbol{R}\left(\dot{\boldsymbol{u}}, \boldsymbol{u}\right) := \dot{\boldsymbol{u}} - \boldsymbol{f}\left(\boldsymbol{u}\right)$. Our goal is to temporally discretize this system and solve for the solution variables, $\dot{\boldsymbol{u}}_{n+1}$ and $\boldsymbol{u}_{n+1}$, at the next time step, $n+1$, given the solutions, $\dot{\boldsymbol{u}}_{n}$ and $\boldsymbol{u}_{n}$, at the current time step, $n$, for $n \in \left[0, N_{t} - 1\right]$, where $N_{t}$ is the total number of time steps. $\dot{\boldsymbol{u}}_{n=0}$ and $\boldsymbol{u}_{n=0}$ are given by the initial condition. Note that \eqref{eqn_general_ode} and \eqref{eqn_general_ode_residual} may be obtained by some spatially discretizing some partial differential equation with the finite element method. For example, the governing system of ODEs for the unsteady heat equation is

$$
    \boldsymbol{R}\left(\dot{\boldsymbol{u}}, \boldsymbol{u}\right) = \boldsymbol{M}\dot{\boldsymbol{u}} + \boldsymbol{K}\boldsymbol{u} - \boldsymbol{F} = \boldsymbol{0}. \label{eqn_heat_ode}
$$

To solve \eqref{eqn_general_ode_residual}, we will use the generalized-$\alpha$ method,

$$ \begin{aligned} & \boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right) = \dot{\boldsymbol{u}}_{n+\alpha_m} - \boldsymbol{f}\left(\boldsymbol{u}_{n+\alpha_f}\right) = 0, \\ & \boldsymbol{u}_{n+1} = \boldsymbol{u}_{n} + \Delta t \dot{\boldsymbol{u}}_{n} + \gamma \Delta t \left(\dot{\boldsymbol{u}}_{n+1} - \dot{\boldsymbol{u}}_{n}\right), \\ & \dot{\boldsymbol{u}}_{n+\alpha_m} = \dot{\boldsymbol{u}}_{n} + \alpha_{m} \left(\dot{\boldsymbol{u}}_{n+1} - \dot{\boldsymbol{u}}_{n}\right), \\ & \boldsymbol{u}_{n+\alpha_f} = \boldsymbol{u}_{n} + \alpha_{f} \left(\boldsymbol{u}_{n+1} - \boldsymbol{u}_{n}\right). \end{aligned} $$

This method iteratively solves for $\dot{\boldsymbol{u}}_{n+1}$ and $\boldsymbol{u}_{n+1}$ with a single predictor step and multiple corrector steps.

<li> \textbf{Predictor stage}:
    First, the predictions of $\dot{\boldsymbol{u}}_{n+1}$ and $\boldsymbol{u}_{n+1}$ are set to

    $$
    \begin{aligned}
        \boldsymbol{u}_{n+1}^{l=0} &= \boldsymbol{u}_{n}, \label{eqn_gen_alpha_predictor_u} \\
        \dot{\boldsymbol{u}}_{n+1}^{l=0} &= \frac{\gamma - 1}{\gamma}\dot{\boldsymbol{u}}_{n}, \label{eqn_gen_alpha_predictor_udot}
    \end{aligned}
    $$

    where $l$ is the iteration number. This is performed in the \texttt{picp} function in \texttt{pic.cpp} in \texttt{svFSIplus}. 
</li>

<li> \textbf{Multi-corrector stage}:
    Then, the steps below are repeated for $l \in \left[1, N_{l}\right]$, where $N_{l}$ is the total number of iterations, to iteratively correct the predictions. 

<ul>
    <li> 
        We first calculate the solution variables at intermediate time steps,

        $$
        \begin{aligned}
            \dot{\boldsymbol{u}}_{n+\alpha_m} &= \dot{\boldsymbol{u}}_{n} + \alpha_{m} \left(\dot{\boldsymbol{u}}_{n+1}^{l-1} - \dot{\boldsymbol{u}}_{n}\right), 
            \label{eqn_gen_alpha_corrector_l_m} \\
            \boldsymbol{u}_{n+\alpha_f} &= \boldsymbol{u}_{n} + \alpha_{f} \left(\boldsymbol{u}_{n+1}^{l-1} - \boldsymbol{u}_{n}\right) \label{eqn_gen_alpha_corrector_l_f}.
        \end{aligned}
        $$

        This is performed in the \texttt{pici} function in \texttt{pic.cpp} in \texttt{svFSIplus}. 
    </li>

    <li> 
        The corrections are then computed by solving 

        $$
            \boldsymbol{J}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right)\Delta\dot{\boldsymbol{u}} = -\boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right), \label{eqn_gen_alpha_linear_system}
        $$

        where the Jacobian (tangent matrix), $\boldsymbol{J}$, is defined as

        $$
            \begin{split}
                \boldsymbol{J}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right) &= \frac{\partial \boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right)}{\partial \boldsymbol{u}_{n+\alpha_f}} \frac{\partial \boldsymbol{u}_{n+\alpha_f}}{\partial \dot{\boldsymbol{u}}_{n+1}} + \frac{\partial \boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right)}{\partial \dot{\boldsymbol{u}}_{n+\alpha_m}} \frac{\partial \dot{\boldsymbol{u}}_{n+\alpha_m}}{\partial \dot{\boldsymbol{u}}_{n+1}} \\
                &= \alpha_{f}\gamma\Delta t \frac{\partial \boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right)}{\partial \boldsymbol{u}_{n+\alpha_f}} + \alpha_{m} \frac{\partial \boldsymbol{R}\left(\dot{\boldsymbol{u}}_{n+\alpha_m}, \boldsymbol{u}_{n+\alpha_f}\right)}{\partial \dot{\boldsymbol{u}}_{n+\alpha_m}}. \label{eqn_gen_alpha_jacobian}
            \end{split}
        $$

        Here, $\Delta\dot{\boldsymbol{u}}$ is defined as $\Delta\dot{\boldsymbol{u}} = \dot{\boldsymbol{u}}_{n+1}^{l} - \dot{\boldsymbol{u}}_{n+1}^{l-1}$ and the gradients get evaluated to $\frac{\partial \boldsymbol{u}_{n+\alpha_f}}{\partial \dot{\boldsymbol{u}}_{n+1}} = \alpha_{f}\gamma\Delta t \boldsymbol{I}$ and $\frac{\partial \dot{\boldsymbol{u}}_{n+\alpha_m}}{\partial \dot{\boldsymbol{u}}_{n+1}} = \alpha_{m} \boldsymbol{I}$. The linear solve in \eqref{eqn_gen_alpha_linear_system} is performed in the \texttt{ls\_solve} function called in \texttt{main.cpp} of \texttt{svFSIplus}. Observe that this approach obtains acceleration-based corrections, similar to \cite{Esmaily2014, bazilevs2007variational}. Other references use velocity-based corrections \cite{jansen2000generalized}.
    </li>

    <li> 
        After solving \eqref{eqn_gen_alpha_linear_system}, we update the predictions with

        $$
        \begin{aligned}
            \dot{\boldsymbol{u}}_{n+1}^{l} &= \dot{\boldsymbol{u}}_{n+1}^{l-1} + \Delta\dot{\boldsymbol{u}}, \label{eqn_gen_alpha_corrector_update_udot} \\
            \boldsymbol{u}_{n+1}^{l} &= \boldsymbol{u}_{n+1}^{l-1} + \gamma\Delta t \Delta\dot{\boldsymbol{u}}. \label{eqn_gen_alpha_corrector_update_u}
        \end{aligned}
        $$

        This is performed in the \texttt{picc} function in \texttt{pic.cpp} in \texttt{svFSIplus}. 
    </li>
        
</ul>
</li>
After solving for $\dot{\boldsymbol{u}}_{n+1}$ and $\boldsymbol{u}_{n+1}$, we advance to the next time step and repeat the predictor and multi-corrector steps above.