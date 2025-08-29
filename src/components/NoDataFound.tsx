import noDataImg from "../assets/image 6.svg";

const NoDataFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center my-10">
      <div className="flex flex-col items-center justify-center">
        <img src={noDataImg} alt="noDataImg" className="h-24 mb-3" />
        <div className="text-[#818181] text-center text-2xl leading-[28px] font-semibold">
          No Data Found
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
