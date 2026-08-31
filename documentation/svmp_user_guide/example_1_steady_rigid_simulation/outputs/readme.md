
### Specifying Output Quantities

After the boundary conditions and time marching parameters are specified, the next step is to specify the types of output quantities we would like from the simulation. Different output quantities can be selected based on the information you are aiming to obtain from the simulation. By default, the velocity and pressure fields are output since they are the primary outputs from a fluids simulation. Wall shear stress (WSS) is also a common output for cardiovascular simulations due to its correlation with vascular cell growth and remodeling. The outputs are specified within a subsection of the `<Add_equation>` section of the .xml file:

    <Add_equation type="fluid">   
        
        ...

        <Output type="Spatial">
            <Velocity>true</Velocity>
            <Pressure>true</Pressure>
            <WSS>true</WSS>
        </Output>
