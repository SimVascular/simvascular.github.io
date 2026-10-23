### Unsteady Inflow Boundary Condition

The data for the unsteady inflow boundary condition is provided in a text file as a time series of volumetric flow values
representing a periodic flow.

The flow values are used to create the velocity vector data defining the fluid flowing into a face.

The flow file has the following format:

    NumData  NumModes
    T1 Q1
    T2 Q2
    …
    Tn Qn

where<br>
   NumData: number of time-flow pairs T1 Q1, T2 Q2, ..., Tn Qn in the file<br>
   NumModes: number Fourier of modes used to represent the flow as a periodic waveform

The flow for each time step is evaluated using a periodic waveform approximated using a Fourier series. Inflow data can be 
obtained from clinical measurements such as phase-contrast MRI. 

The time values in the file are in seconds. The corresponding volumetric flow rates must be in units consistent with the rest of the simulation. This example uses the centimeter-gram-second (CGS) system, with flow expressed in mL/s (equivalently, cm³/s). The figure below shows the example inlet waveform:

<figure>
  <img class="svImg svImgSm" style="width: auto; max-width: min(100%, 20em); max-height: 18em;" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_flow_waveform.png">
  <figcaption class="svCaption">Example unsteady inlet flow waveform.</figcaption>
</figure>

The flow into a surface face is represented using a negative value. The [`cap_aorta.flow`](/documentation/multi_physics/user-guide/cfd/files/cap_aorta.flow) inlet flow file used in this example spans one second, corresponding to 60 cycles per minute.

To specify this unsteady inlet boundary condition in svMultiPhysics, modify the `<Add_BC>` section of the XML input file corresponding to the inlet surface.

    ...

    <Add_BC name="cap_aorta">
        <Type>Dirichlet</Type>
        <Time_dependence>Unsteady</Time_dependence>
        <Temporal_values_file_path>cap_aorta.flow</Temporal_values_file_path>
        <Profile>Flat</Profile>
        <Zero_out_perimeter>true</Zero_out_perimeter>
        <Impose_flux>true</Impose_flux>
    </Add_BC>

    ...

Compared with the steady inlet boundary condition:

1. `<Time_dependence>` is changed to _Unsteady_.
2. `<Temporal_values_file_path>` is added to reference the `.flow` file containing the flow data.

This example also uses a `Flat` spatial inlet profile instead of the `Parabolic` profile used in Example 1. Temporal variation and spatial profile are separate settings; selecting `Unsteady` does not require a flat profile.

