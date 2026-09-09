
### Assigning Boundary Conditions

The next step is to establish the boundary conditions. Boundary conditions specify the solution behavior at the exterior surfaces of the model that will be used to drive the solution. Recall from the `<Add_mesh>` section that we labeled each of the exterior surfaces according to the .vtp surface mesh files. We can now use these labels to define the boundary conditions. The figure below shows the boundary conditions we wish to specify for this model:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_model_and_bc.png">
  <figcaption class="svCaption" >Descending Aorta model with inflow and outflow boundary conditions labeled.</figcaption>
</figure>

Boundary conditions are specified further down in the `<Add_equation>` section of the .xml file:

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

Notice how there is a separate `<Add_BC>` section for each of the surfaces we defined earlier. The inlet face is `cap_aorta` where we wish to specify an inlet flow rate of $100 \ mL/s$. This value of $100 \ mL/s$ is slightly higher than the typical cardiac output of a healthy individual, but we round up for simplicity. Generally, you want to choose the values of your boundary conditions to match the physiologic data of the patient you are simulating. If you do not have data on specific patients, then using population average values is a reasonable assumption.

Boundary conditions that specify velocity or flow are classified as “Dirichlet” `<Type>` boundary conditions. The flow rate at the inlet is not changing with time, so we specify its `<Time_dependence>` to “Steady”. The `<Value>` for this boundary condition is set to $-100$. We use a negative sign for the value here to specify that the flow is going into the domain. A positive flow value would have the flow exiting the domain. The `<Profile>` setting specifies the spatial profile for the velocity on the face. We set this to “Parabolic” for this case to model the Hagan-Poisuelle solution for flow of a viscous fluid in a pipe. The Hagan-Poisuelle solution has the highest fluid velocity in the center of the vessel and decreases smoothly to a value of zero at the walls. To enforce the no-slip boundary condition at the walls, we set the `<Zero_out_perimeter>` setting to “true”. Finally, to specify that this boundary condition is for the flow (and not velocity), we set the `<Impose_flux>` setting to “true”.

Next, we specify the resistance outlet boundary conditions at the two other caps of the model. Resistance outlet boundary conditions assign a pressure that is proportional to the flowrate of blood passing through the face. Resistance outlet boundary conditions are common for vascular simulations to model the vascular resistance of all smaller vessels downstream. This pressure represents the force needed to push a viscous fluid through the microvasculature:

$$ P = QR $$

Where $R$ is the vascular resistance of the vessels downstream of the outlet face. Pressure boundary conditions are considered “Neumann” `<Type>` and do not change with time. We specify a resistance outlet boundary condition by assigning “Resistance” in the `<Time_dependance>` field in the boundary condition. The value of $2600 \ dynes/cm^5$ was chosen to ensure physiologic pressure values within the model. For this example, we assume both outlet resistances are equal. Thus, we can conclude the two outlets will receive roughly equal flow of about $50 \ mL/s$. We assumed an even flow split for simplicity. Later in the User Guide, we will discuss strategies for assigning a more realistic flow split between vessels by adjusting the relative resistances of the outlets. Using the equation above, we can compute the assigned outlet pressure to be:

$$ P=(50 \ mL/s)*(2600 \ dynes/cm^5)=130000 \ dyne/cm^2 \approx 100 \ mmHg $$

$100 \ mmHg$ of pressure is roughly the average blood pressure in a healthy individual. If you have more specific physiologic data on your patient, you will want to choose your boundary condition values to match your patient data.

The last boundary conditions we need to specify are the wall conditions. This simple simulation assumes the walls are **rigid** which means they are fixed in space. For these cases, we apply the **no slip** boundary condition which states that any fluid in direct contact with the wall will have zero velocity. For both the wall surfaces, we assign them as “Dirichlet” type boundary conditions with a value of $0 \ m/s$. We wish to apply this to the velocity directly, thus the `<Impose_flux>` setting, which was present for the inlet face, is missing here.