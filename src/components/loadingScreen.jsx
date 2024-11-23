const skeletonCard = () => {
  return (
    <section className="flex flex-col fixed w-[102vw] h-[102vh] bg-[rgba(0,0,0,0.7)] top-[0px] left-[0px] z-[40]  items-center justify-center">
      <div className="flex justify-center mt-5 flex-col items-center  max-w-md  h-[150px] w-[150px]">
      <div class="spinner ">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
      </div>
      </div>
      <p className="text-white font-bold text-2xl min-[1000px]:text-3xl">LOADING...</p>
    </section>
  );
};
export default skeletonCard;
