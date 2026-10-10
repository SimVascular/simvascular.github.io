
### Unsteady Inflow Boundary Conditions

Typically, unsteady inflow conditions in the cardiovascular system come from the pulsatile nature of blood flow. Flow and pressure increase when the heart contracts during systole then decrease when the heart relaxes during diastole. This pattern then repeats on the next cardiac cycle. svMultiPhysics thus assumes that unsteady inflow conditions are periodic as well and only require the flow waveform to be defined for the first cycle. This is typically specified in a .flow file. The .flow file is a simple text file that has the following format:

    N_datapoints n_fourier_modes
    T0 Q0
    T1 Q1
    T2 Q2
    …
    Tn Qn

The first line of the .flow file has two integers on it, separated by a space. The first number, `N_datapoints`, specifies the number of datapoints below which describes the flow waveform. This number informs *svMultiPhysics* how many lines it needs to read. The second number, `n_fourier_modes`, specifies the number of Fourier modes that will be used for the waveform reconstruction. Because of the periodic nature of the flow waveforms, *svMultiPhysics* uses a Fourier approximation of the waveform to interpolate its value at any desired timepoint. Having less Fourier modes will result in a smoother waveform that may not be as accurate, while having a higher number of modes will increase the approximation’s accuracy but make it more susceptible to noise. Flow measurements for cardiovascular patients are often taken in the clinic using methods like *pcMRI*. These methods naturally produce noise in the flow measurement that is undesirable to include in a simulation. Reducing the number of Fourier modes in the .flow file will help smooth noise out. If you are unsure, then 10 Fourier modes usually is a good amount that works for most waveforms.

Each line after the first contains the flowrate data. The first entry on each line is the time (in seconds) that the measurement was taken followed by the flowrate. The units for the flowrate are assumed to be consistent with the units used to construct the model. Typically, cardiovascular models are created in centimeters so *svMultiPhysics* uses the CGS (centimeters-grams-seconds) unit system. The CGS unit for flowrate is $mL/s$ or $cm^3/s$. Make sure to check the units used in your medical image data file or mesh file. Below is a sample flow waveform taken at the root of the aorta:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_flow_waveform.png">
  <figcaption class="svCaption" >Pulsatile flow waveform in descending aorta.</figcaption>
</figure>

Flow reaches its maximum magnitude during systole in the early part of the heart cycle then comes back near zero during diastole when the heart is relaxing. We note that the flow is negative due to the sign convention in *svMultiPhysics* to ensure flow enters the domain. From the horizontal axis, we can see that the period is one second showing that the heart rate for this patient is 60 beats per minute (BPM). Ideally, the inflow waveform would use data directly measured from the patient. But in the absence of such data, a generic waveform like this can be used. The .flow file for the above waveform is available here for you to download as a reference: [Download Sample Unsteady .flow File](/documentation/multi_physics/user-guide/cfd/files/cap_aorta.flow).

The average flowrate of the above waveform can be computed by taking the average of all of the flow values in the second column. This gives a value of $83.295 \ mL/s$. If you have data on the average flowrate on your patient, you can consider scaling the above waveform to match. In many cases, average flowrate is easier to measure for most patients than exact flow waveforms. To scale a waveform to match a target flowrate, you would first need to divide every entry in the second column by the original average flowrate of $83.295 \ mL/s$. This will normalize the flow waveform to have a average flowrate of $1 mL/s$. You would then multiply this new column by the desired flowrate of your patient, then output the results to a new .flow file along with the first row and time column to keep the formatting consistent. This can be done in a spreadsheet program or simple programming language like Python or MATLAB.

To specify this unsteady inlet boundary condition in *svMultiPhysics*, we modify the `<Add_BC>` section of the .xml file corresponding to the inlet surface:

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

There are two main changes to this section compared to the steady simulation:

1. `<Time_dependance>` is changed to *Unsteady*
2. `<Temporal_values_file_path>` is added to reference the .flow file containing the flow data.

Note that the name of the .flow file is not required to be ‘cap_aorta.flow’. It is recommended that you change the name of the file to be more specific for your model, especially if you have multiple unsteady inlets.