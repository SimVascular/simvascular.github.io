
### Assigning Boundary Conditions

Boundary conditions specify how the fluid interacts with its bounding surfaces (faces) and are used to prescribe known
values to drive fluid flow. Recall from the `<Add_mesh>` section that we labeled each of the exterior surfaces according to the .vtp surface mesh files. We can now use these labels to define the boundary conditions. The figure below shows the boundary conditions we wish to specify for this model:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_model_and_bc.png">
  <figcaption class="svCaption" >Descending Aorta model with inflow and outflow boundary conditions labeled.</figcaption>
</figure>

Boundary conditions are specified using the `<Add_BC>` parameter:

    <Add_equation type="fluid">   
        
        ...   
       
       <Add_BC name="cap_aorta">
            <Type>Dirichlet</Type>
            <Time_dependence>Steady</Time_dependence>
            <Value>-100</Value>
            <Profile>Parabolic</Profile>
            <Zero_out_perimeter>true</Zero_out_perimeter>
            <Impose_flux>true</Impose_flux>
        </Add_BC>

        <Add_BC name="cap_aorta_2">
            <Type>Neumann</Type>
            <Time_dependence>Resistance</Time_dependence>
            <Value>2600</Value>
            <Profile>Flat</Profile>
        </Add_BC>

        <Add_BC name="cap_right_iliac">
            <Type>Neumann</Type>
            <Time_dependence>Resistance</Time_dependence>
            <Value>2600</Value>
            <Profile>Flat</Profile>
        </Add_BC>

        <Add_BC name="wall_aorta">
            <Type>Dirichlet</Type>
            <Time_dependence>Steady</Time_dependence>
            <Value>0</Value>
            <Profile>Flat</Profile>
            <Zero_out_perimeter>true</Zero_out_perimeter>
        </Add_BC>

        <Add_BC name="wall_right_iliac">
            <Type>Dirichlet</Type>
            <Time_dependence>Steady</Time_dependence>
            <Value>0</Value>
            <Profile>Flat</Profile>
            <Zero_out_perimeter>true</Zero_out_perimeter>
        </Add_BC>

Each `<Add_BC>` section specifies a condition for one of the named surfaces. The inlet face is `cap_aorta`, where a flow rate of $100\ \mathrm{mL/s}$ is prescribed for this example. Boundary-condition values should be chosen to match the available physiologic data and the region being modeled.

Boundary conditions that specify velocity or flow are classified as *Dirichlet* `<Type>` boundary conditions. The flow rate at the inlet is not changing with time, so we specify its `<Time_dependence>` to **Steady**. The `<Value>` for this boundary condition is set to $-100$. We use a negative sign for the value here to specify that the flow is going into the domain. A positive flow value would have the flow exiting the domain. The `<Profile>` setting specifies the spatial profile for the velocity on the face. We set this to **Parabolic** for this case to model the Hagen-Poiseuille solution for flow of a viscous fluid in a pipe. The Hagen-Poiseuille solution has the highest fluid velocity in the center of the vessel and decreases smoothly to a value of zero at the walls. To enforce the no-slip boundary condition at the walls, we set the `<Zero_out_perimeter>` setting to **true**. Finally, to specify that this boundary condition is for the flow (and not velocity), we set the `<Impose_flux>` setting to **true**.

Resistance outlet boundary conditions represent the effect of downstream vascular resistance through $P=QR$. In this example, both outlet resistances are $2600\ \mathrm{dyn\cdot s/cm^5}$.

$$ P = QR $$

Pressure boundary conditions are considered **Neumann** `<Type>`. We specify a resistance outlet boundary condition by assigning **Resistance** in the `<Time_dependence>` field in the boundary condition.

Equal outlet resistances are a simplifying assumption, not a guarantee of equal computed flows, because pressure losses within the three-dimensional vessels also affect the distribution. If an outlet carries approximately $50\ \mathrm{mL/s}$, the resistance relation gives approximately $100\ \mathrm{mmHg}$. The outlet flows should be checked when interpreting this calculation.

$$ P=(50 \ mL/s)*(2600 \ \mathrm{dyn\cdot s/cm^5})=130000 \ dyne/cm^2 \approx 100 \ mmHg $$

$100 \ mmHg$ of pressure is roughly the average blood pressure in a healthy individual. When more specific physiologic data are available for the patient, the boundary condition values should be chosen to match those data.

The last boundary conditions we need to specify are the wall conditions. This simple simulation assumes the walls are rigid which means they are fixed in space. For these cases, we apply the *no slip* boundary condition which states that any fluid in direct contact with the wall will have zero velocity. For both wall surfaces, we assign **Dirichlet** `<Type>` boundary conditions with a value of $0 \ cm/s$. We wish to apply this to the velocity directly, thus the `<Impose_flux>` setting, which was present for the inlet face, is missing here.
