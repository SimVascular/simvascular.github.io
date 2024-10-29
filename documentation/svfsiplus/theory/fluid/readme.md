
<h2> Fluid mechanics </h2>

$$\int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega$$

$$\int \rho N_{a}^{w}\dot{u}_{i} \,d\Omega$$

$$\int \rho N_{a}^{w}u_{k}u_{i, k} + \rho N_{a}^{w}\dot{u}_{i} \,d\Omega$$

$$\int\rho~N_{a}^{w}\dot{u}_{i}+\rho~N_{a}^{w}u_{k}u_{i,k}\,d\Omega$$

$$\int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega + \int \rho N_{a}^{w}\dot{u}_{i} \,d\Omega$$

$$\int \rho N_{a}^{w}\dot{u}_{i} \,d\Omega + \int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega$$

$$\int \rho N_{a}^{w}\frac{du_{i}}{dt} \,d\Omega + \int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega$$

$$ \mathbf{B}\_m :=  \int\_{\Omega\_x} \left( \mathbf{w}\_\mathbf{v} \cdot \rho(p) \frac{\mathrm{d} \mathbf{v}}{\mathrm{d} t} + \nabla\_x \mathbf{w}\_\mathbf{v} : \mathbf{\sigma\_{dev}} - \nabla\_x \cdot \mathbf{w}\_\mathbf{v} p - \mathbf{w}\_\mathbf{v} \cdot \rho(p)\mathbf{f\_b} \right) \mathrm{d} \Omega\_x \\ -\int\_{\Gamma\_x^h} \mathbf{w}\_\mathbf{v} \cdot \mathbf{h} \mathrm{d} \Gamma\_x + \sum\_e \int\_{\Omega\_x^e} \tau\_C \left(\nabla\_x \cdot \mathbf{w}\_\mathbf{v} \right) \left( \beta(p) \frac{\mathrm{d} p}{\mathrm{d} t} + \nabla\_x \cdot \mathbf{v} \right) \mathrm{d} \Omega\_x^e = 0. $$