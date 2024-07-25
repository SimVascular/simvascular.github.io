<h3> Non-Newtonian flow </h3>

Blood is a complex mixture that consists of plasma, blood cells and platelets. The blood viscosity is a complicated subject. It is strongly dependent on several factors such as temperature, hematocrit and, especially, the shear rate. From experimental studies, it is determined that the blood behaves like Newtonian flow at high shear rate ($>100 s^{-1}$). In most large arteries such as aorta, coronary arteries, the shear rate is well above this number and blood can be treated as a Newtonian fluid, that is the viscosity is a constant. On the other hand, when the shear rate is below this threshold, blood presents strong shear thinning behavior, i.e. the viscosity decreases with increasing shear rate. Many viscosity models have been proposed to represent this non-Newtonian behavior <a href="#ref-1">[1]</a>.


<h4> Viscosity models </h4>

Currently, **svFSI** supports three viscosity models: Newtonian, Carreau-Yasuda and Casson <a href="#ref-2">[2]</a>.

<figure>
  <img class="svImg svImgSm" src="/documentation/svfsi/fluid/imgs/non-newtonian.png" style="width:100%;height:auto;max-width: 30vw;">
  <figcaption class="svCaption" >Non-Newtonian viscosity model<a href="#ref-1">[1]</a>.</figcaption>
</figure>

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
The input file mostly follows the master input file [`svFSI_master.inp`](./svFSI_master.inp). Some specific input options are discussed below:

For Newtonian fluid:

```
   Viscosity: Constant {
      Vsalue: 0.04
   }
```

For Casson fluid

```
   Viscosity: Cassons {
      Asymptotic viscosity parameter: 0.3953
      Yield stress parameter: 0.22803
      Low shear-rate threshold: 0.5
   }
```

For Carreau-Yasuda fluid

```
   Viscosity: Carreau-Yasuda {
      Limiting high shear-rate viscosity: 0.022
      Limiting low shear-rate viscosity: 0.22
      Shear-rate tensor multiplier (lamda): 0.11
      Shear-rate tensor exponent (a): 0.644
      Power-law index (n): 0.392
   }
```


