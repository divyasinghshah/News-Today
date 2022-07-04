import React from 'react'

const Newsitem = (props) => {
  let {title, description,imgUrl,newsUrl,author,date,source}=props;
  const noImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglyONFscRhJxriUzbSKkyY8vo1pgS1ZWT7m69vMPVM35N_WvyMwDkklI-OP6uCRqKPBA&usqp=CAUe.jpg';
  return (
    <div className='my-3'>

      <div className="card" >


        <img src={!imgUrl ? noImage: imgUrl} className="card-img-top" alt="..." />

        <div className="card-body">

          <h5 className="card-title">{!title?'No Title':title} <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '80%', zIndex: 1 }}>
            {source}

          </span></h5>
          <p className="card-text">{description}...</p>
          <p class="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="blank" className="btn btn-primary btn-sm">Read More</a>
        </div>
      </div>

    </div>
  )
}

export default Newsitem