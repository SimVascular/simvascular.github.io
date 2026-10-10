
### Specifying Output Quantities

The `<Output>` parameter specifies which quantities to output to VTK files used for visualizing simulation results. 
Different output quantities can be selected based on the information you are aiming to obtain from the simulation. By default, the velocity and pressure fields are output since they are the primary outputs from a fluids simulation. Wall shear stress (WSS) is also a common output for cardiovascular simulations due to its correlation with vascular cell growth and remodeling. The outputs are specified within a subsection of the `<Add_equation>` section:

    <Add_equation type="fluid">   
        
        ...

        <Output type="Spatial">
            <Velocity>true</Velocity>
            <Pressure>true</Pressure>
            <WSS>true</WSS>
        </Output>
