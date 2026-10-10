
### RCR Outlet Boundary Conditions and Resistance Scaling

The other common major change made for unsteady simulations is RCR outlet boundary conditions as opposed to resistance. All blood vessels have the ability to temporarily store blood due to the flexibility of the vessel walls. Blood vessels will locally inflate and deflate in response to fluctuations in blood pressure caused by cardiac contractions. This behavior is called as vessel compliance and affects the flow and pressure waveforms at different parts of the cardiovascular system. For modeling purposes, the main consequence of vessel compliance is that it allows for pressure waveforms at different locations in the cardiovascular system to be “out of phase” with each other. If the walls were rigid, then changes in the flow or pressure at one location would immediately cause a change at all distant locations. For example, a sudden increase in flow at the inlet of a rigid pipe system will cause an instantaneous increase in flow at all other locations due to conservation of mass. But flexible walls have the ability to temporarily “absorb” these changes and propagate them at a finite speed to distal locations, causing the characteristic “out of phase” behavior. This phenomenon is better known as “wave propagation”.

We can account for vessel compliance in *svMultiPhysics* in two places. Compliance can be added directly into the 3D geometry by running a deformable wall simulation. These simulations allow the vessel walls in the 3D model to deform in response to changes in flow and pressure. Deformable wall simulations will be the subject of a future tutorial.

Compliance can also be added to the boundary conditions through the inclusion of capacitors to model the compliance of all vessels downstream of the 3D geometry. Capacitors are lumped parameter representations for vessel compliance, similar to how resistances are lumped parameter representations for viscous resistance. svMultiPhysics incorporates capacitance through an RCR (i.e. resistance, capacitance, resistance) boundary condition at the outlets. RCR outlet boundary conditions are also often called Windkessel boundary conditions:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_rcr_figure.png">
  <figcaption class="svCaption" >RCR Windkessel Outlet Boundary Condition.</figcaption>
</figure>

RCR boundary conditions require specifying the values of all three parameters (proximal resistance $(R_p)$, Capacitance $(C)$, and distal resistance $(R_d)$). We need to select values for these parameters to run the simulation. Just like the previous example, we start with selecting values for the resistances to set the overall pressure in the 3D domain:

$$ R_{outlet} = P/Q $$

Here, $R_{outlet}$ is the overall resistance of the outlet, $P$ is the target pressure that we wish to specify, and $Q$ is the flowrate of blood through that outlet. In the previous example, we assumed the inlet flowrate of $100 \ mL/s$ was split evenly between the two outlets at $50 \ mL/s$ each. We also wished to have a target pressure of $100 \ mmHg$ (or $133300 \ dyne/cm^2$). Normally, the flow split between outlets is not assumed but instead determined by the anatomy. While it is practically impossible to get an accurate measurement of the viscous resistance of all vessels downstream of a 3D model, we can adjust the relative resistances of different outlets based on their area. Vessels with larger cross-sectional areas are assumed to have less viscous resistance downstream than vessels with smaller areas.

Taking this into account, we can first compute an overall vascular resistance for the whole model based on the total flowrate at the inlet and the target pressure:

$$ R_{total} = P_{avg}/Q_{avg} $$

Here, $P_{avg}$ is the average blood pressure in the patient and $Q_{avg}$ is the average flowrate of blood coming in at the inlet. The resistance calculated here must then be split in parallel among all the different outlets. The splitting scales the resistance for a specific outlet based on its area:

$$ R_{outlet} = R_{total} \frac{\sum_{i}^{n} A_i}{A_{outlet}} $$

Here, $R_{outlet}$ is the resistance of that specific outlet, $A_{outlet}$ is the area of that specific outlet, and $\sum_{i}^{n} A_i$ is the sum of all outlet areas. This resistance can then be split between the proximal and distal resistances by following a general ratio rule. Generally, most of the vascular resistance is held in the distal vessels so we can use a simple ratio like the following:

$$ R_p = (1/10)R_{outlet}; R_d = (9/10)R_{outlet} $$

For this example, we have an average inlet flowrate of $83.295 \ mL/s$ and we wish to have an average pressure of $93 \ mmHg$. This gives us a total vascular resistance of $1488.3 \ dyne \cdot s/cm^5$. We have two outlets in the model with areas of $0.791 \ cm^2$ for `cap_aorta_2` and $0.976 \ cm^2$ for `cap_right_iliac`. Using the formula above, we can compute the outlet resistance for each outlet:

$$ R_{aorta2} = (1488.3 \ dyne \cdot s/cm^5) * (0.791 \ cm^2 + 0.976 \ cm^2) / (0.791 \ cm^2) = 3324.7 \ dyne \cdot s/cm^5 $$
$$ R_{iliac} = (1488.3 \ dyne \cdot s/cm^5) * (0.791 \ cm^2 + 0.976 \ cm^2) / (0.976 \ cm^2) = 2694.5 \ dyne \cdot s/cm^5 $$

Now we split each outlet resistance into proximal and distal resistances using the ratio formula:

$$ R_{p,aorta2} = (1/10)*R_{aorta2} = 332.47 \ dyne \cdot s/cm^5 $$

$$ R_{d,aorta2} = (9/10)*R_{aorta2} = 2992.2 \ dyne \cdot s/cm^5 $$

$$ R_{p,iliac} = (1/10)*R_{iliac} = 269.45 \ dyne \cdot s/cm^5 $$

$$ R_{d,iliac} = (9/10)*R_{iliac} = 2425.1 \ dyne \cdot s/cm^5 $$

The other component of the RCR Windkessel outlet boundary conditions is the capacitor. This component represents the compliance of all vessels downstream of the 3D model. Just like how a circuit capacitor can temporarily store electric charge, the capacitor here can temporarily store blood as it exits the 3D domain outlets. The pressure (i.e. voltage) on the capacitor rises with the amount of blood stored and decreases when the capacitor releases the flow. For a typical cardiovascular pulsatile waveform (like the one used in this example), the capacitor will fill when the flow rate is high during systole and discharge when the flow rate is low during diastole. The net effect of this behavior alters the shape and reduces the peak-to-peak amplitudes of the pressure waveform applied at the outlets of the 3D model. With pure resistance outlet boundary conditions, the pressure waveform mimics the exact shape of the inlet flow waveform since the pressure is just a scalar multiple of the flow coming out of the outlet. Capacitances cause peaks in the pressure waveforms to lag behind peaks in the inflow waveform:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_velocity_pressure_lag_waveform.png">
  <figcaption class="svCaption" >Compliance causes pressure waveforms to lag behind velocity waveforms with reduced peak-to-peak amplitudes.</figcaption>
</figure>

The value of the capacitance for each outlet needs to be chosen to run the simulation. This value represents how elastic the downstream vessels are and how much blood they can store. As the value of capacitance is increased, it is expected that the peak-to-peak pressure amplitude will decrease. Ideally, the capacitance value should be chosen so that the maximum and minimum pressure exhibited by the simulation matches the systolic and diastolic pressures of the patient. Unfortunately, choosing the capacitance value is not as easy as the resistance values. For resistances, we can use the Ohm’s Law relationship between average flowrate and average pressure to get an initial estimate for the resistance. The relationship between pressure and flowrate on a capacitor is a differential equation:

$$ \frac{dP}{dt} = \frac{1}{C}Q $$

For this reason, it is recommended to start with a default value of capacitance and iteratively adjust it until the outlet pressure waveform matches your target pressures. For this example, we start with a nominal value of $1*10-4 \ mL/(dyne/cm^2)$ for each outlet. If you have an idea of the overall vessel compliance for your patients, you can split this overall compliance between your outlets based on the outlet cap area. But unlike resistance which scales inversely with area, outlet compliance scales proportionally with area.

To set RCR Windkessel outlet boundary conditions, we adjust the specification of the `<Add_BC>` sections for each outlet cap:

    …	

    <Add_BC name="cap_aorta_2">
		<Type> Neumann </Type>
		<Time_dependence> RCR </Time_dependence>
		<RCR_values>
			<Capacitance> 1e-4 </Capacitance>
			<Distal_resistance> 2992.2 </Distal_resistance>
			<Proximal_resistance> 332.47 </Proximal_resistance>
			<Distal_pressure> 0 </Distal_pressure>
			<Initial_pressure> 0 </Initial_pressure>
		</RCR_values>
	</Add_BC>

	<Add_BC name="cap_right_iliac">
		<Type> Neumann </Type>
		<Time_dependence> RCR </Time_dependence>
		<RCR_values>
			<Capacitance> 1e-4 </Capacitance>
			<Distal_resistance> 2425.1 </Distal_resistance>
			<Proximal_resistance> 269.45 </Proximal_resistance>
			<Distal_pressure> 0 </Distal_pressure>
			<Initial_pressure> 0 </Initial_pressure>
		</RCR_values>
	</Add_BC>

    …

Note how the values for the resistances and capacitances are exactly as we computed. The RCR boundary conditions in *svMultiPhysics* also gives you the option to specify distal and initial pressures. The distal pressure adds a pressure offset to represent the pressure downstream of the RCR elements and the initial pressure is the pressure on the capacitor when the simulation begins. In most cases, we can assume both of these are zero.