<h3 id="developer_implementation_dynamic_arrays"> Dynamic Arrays </h3>
Dynamic arrays have been implemented using the following custom C++ class templates used to store
arrays of int and double values 
<br><br>
<ul>
<a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Vector.h#L48"> Vector.h</a> - 1D array of values accessed using single indexe. Example: A(i)

<a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Array.h#L53"> Array.h </a> - 2D array of values accessed using two indexes. Example: A(i,j)

<a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Array3.h#L45">Array3.h</a> - 3D array of values accessed using three indexes. Example: A(i,j,k)

<a href="https://github.com/SimVascular/svFSIplus/blob/b92add4a33eea4b6632fb323f484f08d3e62a716/Code/Source/svFSI/Tensor4.h#L44"> Tensor4.h </a> - 4D array of values accessed using four indexes. Example: A(i,j,k,m)
</ul> 

These templates have been implemented to reproduce much of the functionality of Fortran dynamic arrays
<ul style="list-style-type:disc;">
<li> Indexing using parenthesis </i>
<li> Column-major order for storing multidimensional arrays </i>
<li> Row and column operations </i>
<li> Intrinsic functions (e.g. sum, abs, etc. </i>
<li> Linear algebra operators </i>
</ul>

In future the custom templates might be replaced with expression templates metaprogramming techniques such as those implemented in <a href="https://eigen.tuxfamily.org/index.php?title=Main_Page">eigen</a>. 

<!-- ------------------------------------------------------------------- -->
<!-- -------------------- Creating Array Objects ----------------------- -->
<!-- ------------------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_creating"> Creating Array Objects </h4>

Objects can be created using its constructor
<pre>
Array<double> A(2,2);
</pre>
or defined and later resized

<pre>
Array<double> A;
 
A.resize(2,2);
</pre>

Object memory is initialized to 0.

An object's memory is freed using its <strong>clear()</strong> method.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
Make sure to use references when accessing array objects unless an explicit copy is needed.
<br><br>
// Creates a reference; com_mod.R will be modfified.<br>
auto& R = com_mod.R;      

// Creates a copy, com_mod.R will not be modfified.<br>
auto R = com_mod.R;       
</div>




<!-- ------------------------------------------------------------------- -->
<!-- -------------------------- Indexing ------------------------------- -->
<!-- ------------------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_indexing"> Indexing </h4>
C++ multidimensional arrays are referenced using 0-based indexing and are traversed in column-major order like Fortran. Array indexes use parenthesis <code>A(i,j)</code> not brackets <code>A[i][j]</code> to access array elements. This was done to make C++ code look more like Fortran and to simplify the conversion process.

Indexes can be checked by defining the <strong>_check_enabled</strong> directive within each template include file. An index out of bounds will throw an std::runtime_error exception. Note that index checking will substantially slow down a simulation so it should be disabled when not testing.

<!-- ------------------------------------------------------------------- -->
<!-- -------------------------- Operators ------------------------------ -->
<!-- ------------------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_operators"> Operators </h4>

Class templates support most mathematical operators: <code>= + - * / +=</code>

Some Fortran array intrinsic (e.g. abs, sqrt) are also supported.

Example
<pre>
Array<double> Wr(dof,nNo), Wc(dof,nNo);
 
Wr = 1.0;
 
Wr = Wr - 0.5;
Wr = Wr / abs(Wr);
Wr = (Wr + abs(Wr)) * 0.5;
 
Wc = 1.0 / sqrt(Wc);
 
W1 = W1 * Wr;
W2 = W2 * Wc;
</pre>

The Array <code>*</code> operator performs an element-by-element multiplication, not a matrix multiplication. This was done to replicate Fortran.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
It is more efficient to use the <code>+=</code> operator <code>A += B</code> than <code>A = A + B</code> which performs a copy.
</div>

<!-- ------------------------------------------------------------------- -->
<!-- -------------------------- Subsets -------------------------------- -->
<!-- ------------------------------------------------------------------- -->
<br>
<h4 id="developer_dynamic_arrays_subsets"> Extracting Array Columns and Slices </h4>
A lot of the code uses a column of a 2D array or a slice of a 3D array passed to a function. 

<h5 id="developer_dynamic_arrays_subsets_2d"> Extracting an Array Column </h5>
The <strong>Array</strong> template has two methods used to get a column of data from an <strong>Array</strong> 
object 
<ul style="list-style-type:disc;">
<li> <strong>col</strong> - Returns a new Vector<T> object containing a copy of the column data.
<li> <strong>rcol</strong> - Returns a new Vector<T> object containing an address pointing into the Array internal data. Modifying the Vector<T> object's data modifies the orginal Array data. 
</i>
</ul>

The <strong>rcol()</strong> method returns an <strong>Vector</strong> object whose internal data is a pointer to 
the internal data of an <strong>Array</strong> object. This was done to reduce the overhead of copying sub-arrays 
in some sections of the code. The <strong>Vector</strong> object will not free its data if it 
is a reference to the data of an <strong>Array</strong> object. Use the <strong>rcol</strong> method if the 
column data is going to be modified. It can also speed up code that repeatedly extracts columns used in computations but are not modified.

<h5 id="developer_dynamic_arrays_subsets_3d"> Extracting an Array3 Slice</h5>
The <strong>Array3</strong> template has two methods used to get a 2D slice of data from an <strong>Array3</strong> 
object 

<ul style="list-style-type:disc;">
<li> <strong>slice</strong> - Returns a new Array<T> object containing a copy of the slice data. 
<li> <strong>rslice</strong> - Return an Array<T> object with data pointing into the Array3 internal data. 
</ul>

The <strong>rslice()</strong> method returns an <strong>Array</strong> object whose internal data is a pointer to 
the internal data of an <strong>Array3</strong> object. This was done to reduce the overhead of copying sub-arrays 
in some sections of the custom linear algebra code. The <strong>Array</strong> object will not free its data if it 
is a reference to the data of an <strong>Array3</strong> object. Use the <strong>rslice</strong> method if the 
slice data is going to be modified. It can also speed up code that repeatedly extracts sub-arrays used in computations but are not modified.

<h3 id="developer_dynamic_arrays_0size"> 0-size Arrays </h3>
The Fortran code made use of 0-size arrays in several places, using ALLOCATE with a zero size. For some reason Fortran is OK with using these 0-size arrays.

The C++ code reproduces this by allowing <strong>Array</strong> objects to be allocated with 0 size rows and columns. This is a total hack but it allowed to get the C++ code working without having to rewrite a lot of code.


