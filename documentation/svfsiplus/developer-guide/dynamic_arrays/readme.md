<h2 id="developer_dynamic_arrays"> Dynamic Arrays </h2>
An array is a series of elements of the same type placed in contiguous memory locations. A dynamic array is an array whose size is modifiable at runtime.

Dynamic arrays have been implemented using custom C++ class templates 
<br>
<ul style="list-style-type:disc;">
<li> <a href="#developer_dynamic_arrays_vector"> Vector </a>  </li>
<li> <a href="#developer_dynamic_arrays_array"> Array </a>  </li>
<li> <a href="#developer_dynamic_arrays_array3"> Array3 </a>  </li>
<li> <a href="#developer_dynamic_arrays_tensor4"> Tensor4 </a>  </li>
</ul>
to store arrays of <code>int</code> and <code>double</code> values.

These templates have been implemented to reproduce much of the functionality of Fortran dynamic arrays
<ul style="list-style-type:disc;">
<li> Indexing using parenthesis </i>
<li> Column-major order for storing multidimensional arrays </i>
<li> Row and column operations </i>
<li> Intrinsic functions: abs, sqrt, sum </i>
<li> Linear algebra operators </i>
</ul>

Templates have some common attributes and methods 
<ul style="list-style-type:disc;">
<li> <strong>clear()</strong> method - release array memory </i>
<li> <strong>data()</strong> method - returns a raw pointer to the array's memory (needed for MPI calls)</i>
<li> <strong>resize()</strong> method - resize array memory </i>
<li> Allocated memory is initialized to {} </i>
<li> Mathematical operators <code>= + - * / +=</code> </li>
</ul>


The Fortran code made use of <strong>0-size arrays</strong> in several places, using ALLOCATE with a zero size. For some reason Fortran is OK with using these 0-size arrays.
The C++ code reproduces this by allowing <strong>Array</strong> objects to be allocated with 0 size rows and columns. This is a total hack but it allowed to get the C++ code working without having to rewrite a lot of code.

Indexes can be checked by defining the <strong>_check_enabled</strong> directive within each template include file. An index out of bounds will throw an std::runtime_error exception. Note that index checking will substantially slow down a simulation so it should be disabled when not testing.

In future the custom templates might be replaced with expression templates metaprogramming techniques such as those implemented in <a href="https://eigen.tuxfamily.org/index.php?title=Main_Page">eigen</a>. 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
It is more efficient to use the <code>+=</code> operator <code>A += B</code> than <code>A = A + B</code> which performs a copy.
</div>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Template arrays are objects and are allocated on the heap. It is therefore more efficient to use C++ arrays allocated on the stack for local operations within a function, especially if these functions are called millions of times (e.g. material models).

Example: Use <code>double A[3][3]</code> rather than <code>Array&lt;double> A(3,3);</code>
</div>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
Make sure to use references when accessing array objects unless an explicit copy is needed.
<br><br>
// Creates a reference; com_mod.R will be modified.<br>
auto& R = com_mod.R;      

// Creates a copy, com_mod.R will not be modified.<br>
auto R = com_mod.R;       
</div>

<!-- --------------------------------------------------------- -->
<!-- --------------- Vector Template ------------------------- -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_dynamic_arrays_vector"> Vector Template </h4>
The <a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Vector.h#L48"> Vector.h</a> template is used to store a 1D array of values accessed using a single index. 

<!-- --------------------------------------------------------- -->
<!-- --------------- Array Template  ------------------------- -->
<!-- --------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_array"> Array Template </h4>
The <a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Array.h#L53"> Array.h </a> template is used to store a 2D array of values. Values are accessed using two indexes. 

Example of Array operators
<pre>
Array<double> Wr(dof,nNo);
Array<double> Wc(dof,nNo);
 
// Set all array elements to 1.0.
Wr = 1.0;
 
Wr = Wr - 0.5;
Wr = Wr / abs(Wr);
Wr = (Wr + abs(Wr)) * 0.5;
 
Wc = 1.0 / sqrt(Wc);
 
W1 = W1 * Wr;
W2 = W2 * Wc;
</pre>

The <strong>Array</strong> <code>*</code> operator performs an element-by-element multiplication, not a matrix multiplication. This was done to replicate Fortran.

<h5> Extracting a column of data </h5>
A lot of the code uses a column of a 2D array passed to a function or used in an expression. 
The <strong>Array</strong> template has two methods used to get a column of data from an <strong>Array</strong> 
object 
<ul style="list-style-type:disc;">
<li> <strong>col</strong> - Returns a new Vector<T> object containing a copy of the column data.
<li> <strong>rcol</strong> - Returns a new Vector<T> object containing an address pointing into the Array internal data. Modifying the Vector<T> object's data modifies the original Array data. 
</i>
</ul>

The <strong>rcol()</strong> method returns an <strong>Vector</strong> object whose internal data is a pointer to 
the internal data of an <strong>Array</strong> object. This was done to reduce the overhead of copying sub-arrays 
in some sections of the code. The <strong>Vector</strong> object will not free its data if it 
is a reference to the data of an <strong>Array</strong> object. Use the <strong>rcol</strong> method if the 
column data is going to be modified. It can also speed up code that repeatedly extracts columns used in computations but are not modified.

<!-- --------------------------------------------------------- -->
<!-- --------------- Array3 Template  ------------------------ -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_dynamic_arrays_array3"> Array3 Template </h4>
The <a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Array3.h#L45">Array3.h</a> template is used to store a 3D array of values. Values are accessed using three indexes.  

<h5> Extracting a 2D slice of data </h5>
A lot of the code uses a slice of a 3D array passed to a function or used in an expression. 
<ul style="list-style-type:disc;">
<li> <strong>slice()</strong> - Returns a new Array<T> object containing a copy of the slice data. 
<li> <strong>rslice()</strong> - Return an Array<T> object with data pointing into the Array3 internal data. 
</ul>

The <strong>rslice()</strong> method returns an <strong>Array</strong> object whose internal data is a pointer to 
the internal data of an <strong>Array3</strong> object. This was done to reduce the overhead of copying sub-arrays 
in some sections of the custom linear algebra code. The <strong>Array</strong> object will not free its data if it 
is a reference to the data of an <strong>Array3</strong> object. Use the <strong>rslice</strong> method if the 
slice data is going to be modified. It can also speed up code that repeatedly extracts sub-arrays used in computations but are not modified.

<!-- --------------------------------------------------------- -->
<!-- --------------- Tensor4 Template  ----------------------- -->
<!-- --------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_tensor4"> Tensor4 Template </h4>
The <a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Tensor4.h#L44"> Tensor4.h </a> template is used to store a 4D array of values. Values are accessed using fours indexes.  
<strong>Tensor4</strong> objects are primarily used in material model code.

