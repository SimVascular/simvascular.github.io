<h3> Non-Newtonian flow </h3>

Blood is a complex mixture that consists of plasma, blood cells and platelets. The blood viscosity is a complicated subject. It is strongly dependent on several factors such as temperature, hematocrit and, especially, the shear rate. From experimental studies, it is determined that the blood behaves like Newtonian flow at high shear rate ($>100 s^{-1}$). In most large arteries such as aorta, coronary arteries, the shear rate is well above this number and blood can be treated as a Newtonian fluid, that is the viscosity is a constant. On the other hand, when the shear rate is below this threshold, blood presents strong shear thinning behavior, i.e. the viscosity decreases with increasing shear rate. Many viscosity models have been proposed to represent this non-Newtonian behavior <a href="#ref-1">[1]</a>.


<h4> Viscosity models </h4>

Currently, **svMultiPhysics** supports three viscosity models: Newtonian, Carreau-Yasuda and Casson <a href="#ref-2">[2]</a>.

<br>
<figure>
  <img src="/documentation/multi_physics/user-guide/hemodynamics/imgs/non-newtonian.png" style="float: left; width: 50%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<br>

Carreau-Yassuda model is defined as

$$\eta=\eta\_\infty + (\eta\_0 - \eta\_\infty) \left[ 1 + \left( \lambda\dot(\gamma)^a \right) \right]^{\frac{n-1}{a}}$$

Here:

<ul>
    <li>$\eta\_\infty$: limiting high shear-rateviscosity;</li>
    <li>$\eta\_0$: limiting low shear-rate viscosity;</li>
    <li>$\lambda$: shear-rate tensor multiplier;</li>
    <li>$\dot{\gamma}$: shear rate;</li>
    <li>$a$: shear-rate tensor exponent;</li>
    <li>$n$: power-law index.</li>
</ul>

Casson model is defined as

$$\eta=\frac{1}{\dot{\gamma}}\left[ k\_0 ( c ) + k\_1 ( c )\sqrt{\dot{\gamma}} \right]^2$$

Here, $k\_0 ( c )$ and $k\_1 ( c )$ are functions of the hematocrit $c$.


<h4> Input file </h4>
Input options for different viscosity models are discussed below:

For Newtonian fluid:

```
   <Viscosity model="Constant" >
      <Value> 0.04 </Value>
   </Viscosity>
```

For Casson fluid

```
   <Viscosity model="Cassons" >
      <Asymptotic_viscosity_parameter> 0.3953 </Asymptotic_viscosity_parameter> 
      <Yield_stress_parameter> 0.22803 </Yield_stress_parameter> 
      <Low_shear_rate_threshold> 0.5 </Low_shear_rate_threshold> 
   </Viscosity>
```

For Carreau-Yasuda fluid

```
   <Viscosity model="Carreau-Yasuda" >
      <Limiting_high_shear_rate_viscosity> 0.022 </Limiting_high_shear_rate_viscosity> 
      <Limiting_low_shear_rate_viscosity> 0.22 </Limiting_low_shear_rate_viscosity> 
      <Shear_rate_tensor_multiplier> 0.11 </Shear_rate_tensor_multiplier> 
      <Shear_rate_tensor_exponent> 0.644 </Shear_rate_tensor_exponent> 
      <Power_law_index> 0.392 </Power_law_index> 
   </Viscosity>
```
