<template>

    <!-- <div class="up_container">  
      <div class="what_we_do">
        <h3>What we do?</h3>
        <p>
          Good process leads to real results. With Supply Chain Solutions, we combine a process-driven approach with action to deliver measurable business value. So you can be more efficient. Leaner. More agile. So you can free up cash flow. Save money. Deliver smarter.
        </p>
        <button>Learn more</button>
      </div>


      <div class="how_we_do_it">
        <img src="../assets/homePage/hwdi.png" alt="how_we_do_it image not found">
        <div>
          <h3>How We Do It</h3>
          <p>
            At Supply Chain Solutions, we marry business process, technology and your company culture to develop strategies and a plan so you can implement business improvements that get near-term and long-term results. Through our Consulting Group, we analyze your supply chain and make recommendations that deliver true business value. See how Supply Chain Solutions works for you.
          </p>
        </div>  
      </div>
    </div> -->

    <div class="home_page_container">
        <h2>Our services</h2>

        <div class="all_services_container">

            <div class="service">
                <img src="../assets/homePage/client.png" alt="service_client image not found">
                <h3>Client management</h3>
                <p>Service information about and more. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni repellendus harum fugiat doloremque voluptas amet, veniam, quis illum dolore nam culpa hic? Ratione, commodi dolorum? Odit, quo! Enim, sed?</p>
            </div>

            <div class="service">
                <img src="../assets/homePage/product.png" alt="service_product image not found">
                <h3>Products</h3>
                <p>Service information about and more. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni repellendus harum fugiat doloremque voluptas amet, veniam, quis illum dolore nam culpa hic? Ratione, commodi dolorum? Odit, quo! Enim, sed?</p>
            </div>
            
            <div class="service">
                <img src="../assets/homePage/supplier.png" alt="service_supplier image not found">
                <h3>Supplier management</h3>
                <p>Service information about and more. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni repellendus harum fugiat doloremque voluptas amet, veniam, quis illum dolore nam culpa hic? Ratione, commodi dolorum? Odit, quo! Enim, sed?</p>
            </div>

            <div class="service">
                <img src="../assets/homePage/invoice.png" alt="service_invoice image not found">
                <h3>Invoices</h3>
                <p>Service information about and more. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni repellendus harum fugiat doloremque voluptas amet, veniam, quis illum dolore nam culpa hic? Ratione, commodi dolorum? Odit, quo! Enim, sed?</p>
            </div>

        </div>


        <div class="video_container">
            <section>
                <iframe  width="874" height="492" src="https://www.youtube.com/embed/bwl5ohf1qsg" title="SCM YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </section>
        </div>


        <div class="people_matter_container">
            <h2>People Matter. Get inspired.</h2>
            <p>
                Supply Chain Solutions, Inc. is a progressive-thinking supply chain management and improvement group headquartered in Grand Rapids, Michigan.
                <br>
                Why SCS?
                <br>
                We believe people decide to grow their careers with us because this is a place where contributions are valued and ideas are respected. It's a place built on and driven by dreams. And it's a place where respect for our clients and respect for each other are paramount to our success.
                <br>
                We are a company built on relationships—and to build a relationship, you must establish, nurture and grow personal connections. We strive to provide a work environment that empowers our professionals as individuals, and as a team. This is a place where we live our core values:
                <br>
                People matter at SCS. You can make a salary. Or you can make a difference. Or you can work at Supply Chain Solutions and make both. Speak up, solve problems, lead others, and be an owner. All while giving back to the community and caring for a better world.
                <br>
                Join us and make your mark.
            </p>
        </div>


        <div class="logoSCS">
            <img :src="logoSCS" alt="No logo found">
        </div>

        
    </div>
</template>

<script>
import image from "../assets/SCS-Logo.png"
export default {
  name: "HomePage",
  data: function(){
      return {
          logoSCS: image,
      }
  }
};
</script>

<style>

/* .header_up_container {
  background-image: url("../assets/homePage/navigationBackground.png");
} */

.up_container {
    background-image: url("../assets/homePage/Background.png");
    width: 1828px;
    height: 890px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 0 2% 2% 2%;
}

/* .header_up_container {
  background-image: url("../assets/homePage/Background.png");
} */

.what_we_do {
  display: flex;
  align-items: center;
  margin: 0 2% 2.5% 2%;
  flex-direction: column;
  width: 65%;
  text-align: center;
}

.how_we_do_it {
  display: flex;
  padding: 2% 0 0 0;
  justify-content: center;
  width: 75%;
  text-align: justify;
}

.how_we_do_it img {
  width: 450px;
}


.what_we_do button {
  color: white;
  width: 32%;
  background: #8c86ac;
  border: 1px solid white;
  border-radius: 50px;
  padding: 12px 20px 20px 20px;
  font-size: 2vh;
}

.what_we_do button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}

.up_container p{
  font-size: 2.5vh;
  margin: 3%;
  color: #dcdce0;
}

.up_container h3{
  font-size: 3vh;
  color: white;
  margin: 3%;
  margin-block-start: 0;
  margin-block-end: 0;
}






.home_page_container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.home_page_container img {
    width: 500px;
}

.home_page_container h2{
    font-size: 4vh;
}

.all_services_container {
    display: flex;
    margin: 0 2% 0 2%;
    justify-content: center;
}

.service {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 14%;
    margin: 0 2% 0 2%;
    padding: 2%;
    text-align: center;
    box-shadow: 3px 3px 3px 3px grey; 
    border-radius: 5%;
}

.service p {
    font-size: 1.8vh;
}

.service h3{
    font-size: 2.5vh;
}

.all_services_container img{
    width: 50%;
}

.video_container {
    display: flex;
    justify-content: center;
    margin: 4% 0 0 0;
}


.people_matter_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    text-align: justify;
}

.service p, .people_matter_container p {
    font-size: 2.3vh;
}

.logoSCS {
    display: flex;
    justify-content: flex-end;
}

</style>
