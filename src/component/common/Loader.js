// import React from 'react';
//
//  const Loader = ({ height, width, count, className }) => {
//
//   const itemCount = parseInt(count, 10);
//   const finalHeight = typeof height === 'string' && !height.includes('px') && !height.includes('%')
//     ? `${height}px`
//     : height;
//
//   return (
//     <div className={`loader-wrapper ${className}`}>
//       {Array.from({ length: itemCount }).map((_, i) => (
//         <div className="skeleton-block" key={i} style={{ height: finalHeight, width }}>
//           <div className="skeleton-shimmer" />
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default Loader;


import React from 'react';

const Loader = ({ height, width, count, className, iClassname, iCount, iWidth, iHeight }) => {
 const itemCount = parseInt(count, 10);
 const finalHeight =
   typeof height === 'string' && !height.includes('px') && !height.includes('%')
     ? `${height}px`
     : height;

 const finalWidth =
   typeof width === 'string' && !width.includes('px') && !width.includes('%')
     ? `${width}px`
     : width;


 const finalIHeight = typeof iHeight === 'string' && !iHeight.includes('px') && !iHeight.includes('%')
   ? `${iHeight}px`
   : iHeight;

 const finalIWidth = typeof iWidth === 'string' && !iWidth.includes('px') && !iWidth.includes('%')
   ? `${iWidth}px`
   : iWidth;

 return (
   <div className={`loader-wrapper ${className}`}>
    {Array.from({ length: itemCount }).map((_, i) => (
      <div
        className="skeleton-block"
        key={i}
        style={{height: finalHeight, width: finalWidth}}
      >
       <div className="skeleton-shimmer"/>
       <div className={`loader-wrapper flex ${iClassname}`} style={{display: "flex"}}>

        {Array.from({length: iCount || 2}).map((_, i) => (
          <div
            className="skeleton-block"
            key={i}
            style={{height: finalHeight, width: finalWidth}}
          >
           <div className="skeleton-shimmer"/>

          </div>
        ))}
       </div>
      </div>
    ))}
   </div>
 );
};

export default Loader;
