
<h2> Fluid mechanics </h2>

Strong form

The incompressible Navier-Stokes-Brinkman equations governing fluid flow in porous media are 
$$
\begin{aligned}
    \rho\left(\dot{\vc{u}} + \vc{u} \cdot \vc{\nabla} \vc{u} - \vc{b}\right) &= \vc{\nabla} \cdot \vc{\sigma} - \frac{\mu}{K}\vc{u}, & \vc{x} \in \Omega,~t \in \mathbb{R}_{\geq 0}, \label{eqn_nsb_pde_momentum} \\
    \vc{\nabla} \cdot \vc{u} &= 0, & \vc{x} \in \Omega,~t \in \mathbb{R}_{\geq 0}, \label{eqn_nsb_pde_continuity}
\end{aligned}
$$
where $K$ is the permeability of the porous media. The standard Navier-Stokes equations for general fluid flow can be recovered by simply removing the Darcy component (i.e., $K \rightarrow \infty$). 

The effective dynamic viscosity, $\mu\left(\vc{u}\right)$, is written generally as a function of velocity here to account for non-Newtonian fluids. For Newtonian fluids, $\mu$ is a simply constant. 

The boundary conditions for \eqref{eqn_nsb_pde_momentum} - \eqref{eqn_nsb_pde_continuity} are 
$$
\begin{aligned}
    \vc{u} &= \vc{g}, & \vc{x} \in \Gamma_{g}, \label{eqn_nsb_pde_dirichlet_bc} \\
    \vc{\sigma} \cdot \vc{n} &= \vc{h}, & \vc{x} \in \Gamma_{h}, \label{eqn_nsb_pde_neumann_bc} 
\end{aligned}
$$
where $\vc{g}$ is the prescribed velocity and $\vc{h}$ is the prescribed traction.

Residuals

The per-element momentum and continuity residuals are
$$
\begin{aligned} % https://tex.stackexchange.com/a/358700
    \begin{split}
        R_{ai}^{m} = & \int \rho N_{a}^{w}\dot{u}_{i} \,d\Omega + \int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega - \int pN_{a, i}^{w} \,d\Omega + \int N_{a, j}^{w}2\mu\epsilon_{ij} \,d\Omega + \int \frac{\mu}{K}N_{a}^{w}u_{i} \,d\Omega - \int N_{a}^{w} \rho b_{i} \,d\Omega \\ 
        & + \int \tau_{SUPS}N_{a, k}^{w}u_{k}r_{Mi} \,d\Omega + \int \rho \nu_{LSIC}r_{C}N_{a, i}^{w} \,d\Omega - \int N_{a}^{w}\tau_{SUPS}r_{Mk}u_{i,k} \,d\Omega \\
        & - \int N_{a, k}^{w}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} \,d\Omega - \int \frac{\nu}{K}\tau_{SUPS}N_{a}^{w}r_{Mi} \,d\Omega + \int \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a, k}^{w}r_{Mk}r_{Mj}u_{i,j} \,d\Omega, \label{eqn_nsb_svfsiplus_residual_momentum}
    \end{split}
    \\[2ex]
    \begin{split}
        R_{a}^{c} = & \int N_{a}^{q}u_{i,i} \,d\Omega + \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}r_{Mi} \,d\Omega, \label{eqn_nsb_svfsiplus_residual_continuity}
    \end{split}
\end{aligned}
$$
where, for the $a^{\text{th}}$ node in a given element, $R_{ai}^{m}$ is the momentum residual in the $i^{\text{th}}$ direction and $R_{a}^{c}$ is continuity residual.

Tangent matrices
  
The following inconsistent tangent matrices are used,

$$
\begin{aligned}
    \begin{split} % https://tex.stackexchange.com/a/82638
        K_{ab}^{ij} =~&\alpha_{m}\left( \int \rho N_{a}^{w}N_{b}^{w} \delta_{ij} \,d\Omega 
        + \int \tau_{SUPS} N_{a,g}^{w} u_{g} \rho N_{b}^{w} \delta_{ij} \,d\Omega 
        - \int N_{a,k}^{w} \tau_{SUPS}^{2} N_{b}^{w} \delta_{ij} r_{Mk} \,d\Omega 
        \right) \\
        &+ \alpha_{f}\gamma\Delta t \left(
        \int \rho N_{a}^{w} u_{k} N_{b, k}^{w} \delta_{ij} \,d\Omega 
        + \int N_{a, l}^{w} \mu N_{b, l}^{w} \delta_{ij} \,d\Omega 
        + \int N_{a, j}^{w} \mu N_{b, i}^{w} \,d\Omega \right. \\
        &+ \left. \int \frac{\mu}{K} N_{a}^{w} N_{b}^{w} \delta_{ij} \,d\Omega 
        + \int \tau_{SUPS} N_{a,g}^{w} u_{g} \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} \,d\Omega 
        + \int \rho \nu_{LSIC} N_{b,j}^{w} N_{a,i}^{w} \,d\Omega \right. \\
        &- \left. \int N_{a}^{w} \tau_{SUPS} N_{b,k}^{w} \delta_{ij} r_{Mk} \,d\Omega 
        - \int N_{a,k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} r_{Mk} \,d\Omega \right. \\
        &+ \left. \int \frac{4}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{jk} N_{b,k}^{w} \epsilon_{il} N_{a,l}^{w} \,d\Omega 
        + \int \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a,k}^{w} N_{b,z}^{w} r_{Mk} r_{Mz} \delta_{ij} \,d\Omega 
        \right), 
            \label{eqn_nsb_svfsiplus_tangent_matrix_k}
    \end{split}
    \\[2ex]
        G_{ac}^{i} =~&\alpha_{f}\gamma\Delta t \left(-\int N_{c}^{q}N_{a, i}^{w} \,d\Omega + \int \tau_{SUPS} N_{a, g}^{w} u_{g} N_{c, i}^{q} \,d\Omega - \int N_{a, k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} N_{c, i}^{q} r_{Mk} \,d\Omega \right), 
            \label{eqn_nsb_svfsiplus_tangent_matrix_g} \\
        D_{ab}^{j} =~&\alpha_{f}\gamma\Delta t \left(\int N_{a}^{q}N_{b, j}^{w} \,d\Omega - \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}\left(-\frac{\alpha_{m}}{\alpha_{f}\gamma\Delta t}\rho N_{b}^{w}\delta_{ij} - \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}}\right) \,d\Omega\right), 
            \label{eqn_nsb_svfsiplus_tangent_matrix_d} \\
        L_{ac} =~&\alpha_{f}\gamma\Delta t \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}N_{c, i}^{q} \,d\Omega,
            \label{eqn_nsb_svfsiplus_tangent_matrix_l}
\end{aligned}
$$

where 
$$
\frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} = \left(\rho u_{k} N_{b,k}^{w} - \mu N_{b,kk}^{w} + \frac{\mu}{K} N_{b}^{w} - \frac{\partial \mu}{\partial x_{k}} N_{b,k}^{w} \right)\delta_{ij} - \frac{2}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{il} N_{b,l}^{w} u_{j, kk} - \frac{\partial \mu}{\partial x_{j}} N_{b,i}^{w}. \label{}
$$