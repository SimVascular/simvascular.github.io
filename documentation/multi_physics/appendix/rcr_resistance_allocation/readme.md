## RCR resistance allocation for Example 2

This optional worked calculation derives the resistance values used in Example 2. It can be skipped when following the main simulation setup.

As in the previous example, an initial resistance estimate can be obtained from the target mean pressure drop and mean flow rate:

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

[Return to the RCR parameter selection in Example 2](#cfd-rcr-parameter-selection).
