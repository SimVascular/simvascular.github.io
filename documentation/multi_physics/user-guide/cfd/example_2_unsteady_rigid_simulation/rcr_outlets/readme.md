
### RCR Outlet Boundary Conditions

RCR outlet boundary conditions extend the resistance conditions used in Example 1 by adding a capacitance. Blood vessels can temporarily store and release blood as their volume changes with pressure. This behavior is described by vascular compliance and influences flow and pressure waveforms. A lumped compliance element is one way to approximate this storage effect as part of the downstream vascular impedance.

Vessel-wall compliance can be represented within the three-dimensional domain by running a deformable-wall simulation. These simulations allow the walls to deform in response to pressure. This example instead retains rigid walls in the three-dimensional domain.

The effect of the downstream vasculature can also be approximated through outlet boundary conditions. An RCR boundary condition combines a capacitance with proximal and distal resistances to provide a lumped approximation of the downstream vascular impedance. Its capacitance represents a storage effect, rather than a detailed description of the compliance of every downstream vessel. This lumped model does not reproduce wave propagation along deformable vessel walls. RCR outlet boundary conditions are also called three-element Windkessel boundary conditions:

<figure>
  <img class="svImg" src="/img/rcr-boundary-condition.svg" alt="Red vessel supplying flow Q to an RCR circuit with proximal resistance Rp, capacitance C, and distal resistance Rd." width="520" height="143" style="width: 520px; max-width: 100%; height: auto; color-scheme: light;">
  <figcaption class="svCaption" >RCR Windkessel outlet boundary condition.</figcaption>
</figure>

<a id="cfd-rcr-parameter-selection"></a>

RCR boundary conditions require values for three parameters: proximal resistance $(R_p)$, capacitance $(C)$, and distal resistance $(R_d)$. This example allocates initial outlet resistance estimates inversely to outlet area, with 10% assigned to proximal resistance and 90% to distal resistance. The derivation and worked values are provided in the optional [RCR resistance-allocation appendix](#appendix_rcr_resistance_allocation). The actual flow split also depends on pressure losses in the three-dimensional domain and the outlet boundary conditions.

The other component of the RCR Windkessel model is the capacitor. With a pure resistance condition, the pressure drop is proportional to the flow through that outlet. With capacitance, the relationship between pressure and flow also depends on storage, which can change waveform shape, including amplitude and timing. This figure illustrates how a lumped compliance element can alter the relationship between pressure and flow:

<figure>
  <img class="svImg svImgMd svImgCompact" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex2_velocity_pressure_lag_waveform.png">
  <figcaption class="svCaption" >Illustration of changes in pressure and flow waveform amplitude and timing with a lumped compliance element.</figcaption>
</figure>

The capacitance is a parameter of the lumped outlet model that needs to be selected. Available pressure measurements can guide its adjustment, but it cannot generally be determined from a mean pressure and flow alone. Unlike the mean resistance estimate, its effect depends on the time-varying response. The capacitor relation is a differential equation:

$$ \frac{dP}{dt} = \frac{1}{C}Q $$

Here, $P$ is the pressure across the capacitor, and $Q$ is the flow entering the capacitor.

An initial capacitance can be adjusted by comparing the simulated pressure waveform with the target pressure data. For this example, a nominal value of $10^{-4} \ mL/(dyne/cm^2)$ is used for each outlet. If an overall capacitance estimate is available, allocating it in proportion to outlet area is one possible initial modeling choice, in contrast to the inverse-area resistance allocation described in the appendix. The resulting pressures and outlet flows should be checked in the three-dimensional solution.

To set RCR Windkessel outlet boundary conditions, modify the `<Add_BC>` section for each outlet cap as in this example:

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

The XML uses the resistance values calculated in the appendix and the nominal capacitance described above. `<Distal_pressure>` specifies the downstream pressure reference. For a fresh run without flow-based RCR initialization, `<Initial_pressure>` specifies the initial capacitor pressure. Both are set to zero in this example, but they have different roles and zero is not a generally applicable choice for every model.