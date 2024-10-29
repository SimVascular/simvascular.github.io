
<h2> Fluid mechanics </h2>

$$\begin{aligned}
 % https://tex.stackexchange.com/a/358700
            \begin{split}
                R_{ai}^{m} = & \int \rho N_{a}^{w}\dot{u}_{i} \,d\Omega + \int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega - \int pN_{a, i}^{w} \,d\Omega + \int N_{a, j}^{w}2\mu\epsilon_{ij} \,d\Omega + \int \frac{\mu}{K}N_{a}^{w}u_{i} \,d\Omega - \int N_{a}^{w} \rho b_{i} \,d\Omega \\ 
                & + \int \tau_{SUPS}N_{a, k}^{w}u_{k}r_{Mi} \,d\Omega + \int \rho \nu_{LSIC}r_{C}N_{a, i}^{w} \,d\Omega - \int N_{a}^{w}\tau_{SUPS}r_{Mk}u_{i,k} \,d\Omega \\
                & - \int N_{a, k}^{w}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} \,d\Omega - \int \frac{\nu}{K}\tau_{SUPS}N_{a}^{w}r_{Mi} \,d\Omega + \int \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a, k}^{w}r_{Mk}r_{Mj}u_{i,j} \,d\Omega, \label{eqn_nsb_svfsiplus_residual_momentum}
            \end{split}
            \\[2ex]
            \begin{split}
                R_{a}^{c} = & \int N_{a}^{q}u_{i,i} \,d\Omega + \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}r_{Mi} \,d\Omega, \label{eqn_nsb_svfsiplus_residual_continuity}
            \end{split}
        
\end{aligned}$$