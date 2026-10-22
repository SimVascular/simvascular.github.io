### Unsteady Inflow Boundary Conditions

Our model in this example assumes that the inflow repeats with each cardiac cycle. A `.flow` file supplies time and volumetric flow-rate pairs over one cycle which svMultiPhysics uses to prescribe an inlet velocity profile consistent with that periodic flow. The file has the following format:

    N_datapoints n_fourier_modes
    T0 Q0
    T1 Q1
    T2 Q2
    …
    Tn Qn

The first line of a `.flow` file contains two integers. The first, `N_datapoints`, specifies the number of time-flow pairs that follow. The second, `n_fourier_modes`, specifies the number of Fourier modes used to represent the waveform, 10 in this example. The supplied waveform contains 1,001 pairs spanning one second, so its header is `1001 10`.

The user is responsible for supplying a periodic inflow waveform in the `.flow` file. svMultiPhysics uses a Fourier approximation to represent this waveform and evaluate flow at the times required by the simulation. Inflow waveforms can be obtained from measurements such as phase-contrast MRI, which can be used to measure blood-flow velocity and derive volumetric flow rate.

Each line after the first in the `.flow` file contains a time value in seconds and the corresponding volumetric flow rate. The units must be consistent with the rest of the simulation. This example uses the centimeter-gram-second (CGS) system, with flow expressed in mL/s (equivalently, cm³/s). The figure below shows the example inlet waveform:

<figure>
  <img class="svImg svImgSm" style="width: auto; max-width: min(100%, 20em); max-height: 18em;" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_flow_waveform.png">
  <figcaption class="svCaption">Example pulsatile inlet flow waveform.</figcaption>
</figure>

In svMultiPhysics, flow across the boundaries of the computational domain is considered positive when directed outward. Accordingly, the inflow values in this `.flow` file are negative. The example waveform spans one second, corresponding to 60 cycles per minute. The waveform shown above is available as this sample: [`cap_aorta.flow`](/documentation/multi_physics/user-guide/cfd/files/cap_aorta.flow).

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

The `.flow` file does not have to be named `cap_aorta.flow`. A model-specific file name can help distinguish waveforms, especially when there are multiple inlets with prescribed unsteady flow.
