const buttonColorChange = async (target, api) => {
  const allbtn = document.getElementById("Allbtn");
  const openbtn = document.getElementById("Openbtn");
  const closebtn = document.getElementById("Closedbtn");
  const clickbtn = document.getElementById(target);
  allbtn.classList.remove("active");
  openbtn.classList.remove("active");
  closebtn.classList.remove("active");
  clickbtn?.classList?.add("active");
  try {
    const totalIssuesElement = document.getElementById("countIssues");
    const cardSection = document.getElementById("cardSection");
    const response = await fetch(api);
    const data = await response.json();
    let cardData = data?.data;
    if (target == "Openbtn") {
      console.log(`click`);
      cardData = cardData?.filter((card) => card?.status == "open");
    }
    if (target == "Closedbtn") {
      cardData = cardData?.filter((card) => card?.status == "closed");
    }
    if (target == "Search") {
      const searchInputElement = document.getElementById("searchInput");

      const searchText = searchInputElement.value;

      //  no input value
      if (!searchText) {
        return alert("search input are requird");
      }
      //  input type check
      if (typeof searchText !== "string") {
        return alert("search input must be a string value");
      }
      const searchApi = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
      const responseSearchData = await fetch(searchApi);
      const Searchdata = await responseSearchData.json();
      cardData = Searchdata?.data;
      searchInputElement.value = "";
    }
    totalIssuesElement.innerText = cardData?.length;
    cardSection.innerHTML = "";
    cardData.map((data) => {
      const card = `
     <div onclick="my_modal_1(${data?.id})"   class="cursor-pointer card bg-base-100 w-[300px] shadow-sm overflow-hidden h-[350px] flex-shrink-0 rounded-[4px] border-t-3 ${data?.priority == "low" ? "border-[#A855F7]" : "border-[#00A96E]"}">
          <div class="card-body">
            <div class="flex justify-between">
              <div>
                <img class="w-[25px] h-[25px]" src="${data?.status == "open" ? "./images/Open-Status.png" : "./images/Closed- Status .png"}" alt="" />
              </div>
              <div class="rounded-[100px]  text-[12px] uppercase text-center font-[500] px-5 flex justify-center items-center ${data?.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : data?.priority == "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"}">
                <p>${data?.priority}</p>
              </div>
            </div>
            <h2 class="mt-3 font-[600] text-[#1F2937] text-[16px] capitalize">${data?.title}</h2>
            <p class="mt-2  text-[#64748B] text-[14px] ">
              ${data?.description}
            </p>
            <div class="flex space-x-1 items-center   ">
            
            ${data?.labels
              ?.map(
                (label) => `
    ${
      label == "help wanted"
        ? `<div class="flex items-center space-x-[2px] justify-center text-[#D97706] bg-[#FFF8DB] rounded-[100px] border border-[#FDE68A] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/Vector (2).png" alt="help wanted"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
        : label == "enhancement"
          ? `<div class="flex items-center space-x-[2px] justify-center text-[#00A96E] bg-[#DEFCE8] rounded-[100px] border border-[#BBF7D0] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/Open-Status.png" alt="enhancement"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
          : `<div class="flex items-center space-x-[2px] justify-center text-[#EF4444] bg-[#FEECEC] rounded-[100px] border border-[#FECACA] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/BugDroid.png" alt="bug"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
    }
  `,
              )
              .join("")}
            </div>
            <div class="mt-[30px]  border-t-2 border-gray-200 pt-2">
              <h2 class="text-[14px] text-[#64748B]">#1 by ${data?.author}</h2>
              <p class="mt-2 text-[14px] text-[#64748B]">${new Date(data?.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
    `;
      cardSection.innerHTML += card;
    });
  } catch (error) {
    console.log(error?.message || error);
  }
};

//  first call function
buttonColorChange(
  "Allbtn",
  "https://phi-lab-server.vercel.app/api/v1/lab/issues",
);
