
### RCR Outlet Boundary Conditions and Resistance Scaling

RCR outlet boundary conditions extend the resistance conditions used in Example 1 by adding a capacitance. Blood vessels can temporarily store and release blood as their volume changes with pressure. This behavior is described by vascular compliance and influences flow and pressure waveforms. A lumped compliance element is one way to approximate this storage effect as part of the downstream vascular impedance.

Vessel-wall compliance can be represented within the three-dimensional domain by running a deformable-wall simulation. These simulations allow the walls to deform in response to pressure. This example instead retains rigid walls in the three-dimensional domain.

The effect of the downstream vasculature can also be approximated through outlet boundary conditions. An RCR boundary condition combines a capacitance with proximal and distal resistances to provide a lumped approximation of the downstream vascular impedance. Its capacitance represents a storage effect, rather than a detailed description of the compliance of every downstream vessel. This lumped model does not reproduce wave propagation along deformable vessel walls. RCR outlet boundary conditions are also called three-element Windkessel boundary conditions:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_rcr_figure.png">
  <figcaption class="svCaption" >RCR Windkessel outlet boundary condition.</figcaption>
</figure>

RCR boundary conditions require values for three parameters: proximal resistance $(R_p)$, capacitance $(C)$, and distal resistance $(R_d)$. As in the previous example, an initial resistance estimate can be obtained from the target mean pressure drop and mean flow rate:

$$ R_{outlet} = P/Q $$

Here, $R_{outlet}$ is the total resistance assigned to an outlet, $P$ is the target mean pressure drop across that resistance, and $Q$ is the mean flow rate through the outlet. With a zero downstream pressure reference, the target mean pressure can be used for $P$. In the previous example, an inlet flow rate of $100 \ mL/s$ and an equal split of $50 \ mL/s$ per outlet were used for the initial calculation, with a target pressure of $100 \ mmHg$ (or $133300 \ dyne/cm^2$). The computed flow split also depends on pressure losses in the three-dimensional model and on the outlet boundary conditions; it is not determined by anatomy alone. For this example, outlet area is used to allocate initial resistance estimates, assigning less resistance to larger outlets.

An equivalent total resistance can first be estimated from the total mean inlet flow rate and the target mean pressure drop:

$$ R_{total} = P_{avg}/Q_{avg} $$

Here, $P_{avg}$ is the target mean pressure drop, with the downstream pressure reference set to zero, and $Q_{avg}$ is the mean inlet flow rate. Outlet resistances are then allocated in parallel, inversely proportional to their areas:

$$ R_{outlet} = R_{total} \frac{\sum_{i}^{n} A_i}{A_{outlet}} $$

Here, $R_{outlet}$ is the resistance assigned to that outlet, $A_{outlet}$ is its area, and $\sum_{i}^{n} A_i$ is the sum of all outlet areas. In this example, the resistance is divided into 10% proximal and 90% distal resistance. Area-based allocation and this ratio provide initial model values, not measured downstream properties:

$$ R_p = (1/10)R_{outlet}; R_d = (9/10)R_{outlet} $$

For this example, the mean inlet flow magnitude is $83.295 \ mL/s$ and the target mean pressure is $93 \ mmHg$. These values give an initial total resistance estimate of $1488.3 \ dyne \cdot s/cm^5$. The two outlets have areas of $0.791 \ cm^2$ for `cap_aorta_2` and $0.976 \ cm^2$ for `cap_right_iliac`. Using the formula above gives the following outlet resistances:

$$ R_{aorta2} = (1488.3 \ dyne \cdot s/cm^5) * (0.791 \ cm^2 + 0.976 \ cm^2) / (0.791 \ cm^2) = 3324.7 \ dyne \cdot s/cm^5 $$
$$ R_{iliac} = (1488.3 \ dyne \cdot s/cm^5) * (0.791 \ cm^2 + 0.976 \ cm^2) / (0.976 \ cm^2) = 2694.5 \ dyne \cdot s/cm^5 $$

Each outlet resistance is then split into proximal and distal components using the selected ratio:

$$ R_{p,aorta2} = (1/10)*R_{aorta2} = 332.47 \ dyne \cdot s/cm^5 $$

$$ R_{d,aorta2} = (9/10)*R_{aorta2} = 2992.2 \ dyne \cdot s/cm^5 $$

$$ R_{p,iliac} = (1/10)*R_{iliac} = 269.45 \ dyne \cdot s/cm^5 $$

$$ R_{d,iliac} = (9/10)*R_{iliac} = 2425.1 \ dyne \cdot s/cm^5 $$

The other component of the RCR Windkessel model is the capacitor. Just as an electrical capacitor stores charge, this element represents temporary storage of blood, with a pressure response related to the stored volume. Blood can enter this element from the three-dimensional outlet while also leaving through the distal resistance. With a pure resistance condition, the pressure drop is proportional to the flow through that outlet, not necessarily to the inlet flow. Adding capacitance changes the amplitude and timing of the pressure response; the result depends on the RCR parameters and the outlet flow waveform. The figure illustrates how a lumped compliance element can alter the relationship between pressure and flow:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_velocity_pressure_lag_waveform.png">
  <figcaption class="svCaption" >Illustration of changes in pressure and flow waveform amplitude and timing with a lumped compliance element.</figcaption>
</figure>

The capacitance is a parameter of the lumped outlet model and must also be selected. Available pressure measurements can guide its adjustment, but it cannot generally be determined from a mean pressure and flow alone. Unlike the mean resistance estimate, its effect depends on the time-varying response. The capacitor relation is a differential equation:

$$ \frac{dP}{dt} = \frac{1}{C}Q $$

Here, $P$ is the capacitor pressure and $Q$ is the net flow entering the capacitance: the flow entering the RCR model minus the flow leaving through its distal resistance. It is not simply the total flow crossing the three-dimensional outlet.

An initial capacitance can be adjusted by comparing the simulated pressure waveform with the target pressure data. For this example, a nominal value of $10^{-4} \ mL/(dyne/cm^2)$ is used for each outlet. If an overall capacitance estimate is available, allocating it in proportion to outlet area is one possible initial modeling choice, in contrast to the inverse-area resistance allocation. The resulting pressures and outlet flows should be checked in the three-dimensional solution.

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

The resistance and capacitance values in the XML correspond to the example above. `<Distal_pressure>` specifies the downstream pressure reference. For a fresh run without flow-based RCR initialization, `<Initial_pressure>` specifies the initial capacitor pressure. Both are set to zero in this example, but they have different roles and zero is not a generally applicable choice for every model.