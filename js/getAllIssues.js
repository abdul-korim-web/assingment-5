document.getElementById("Allbtn").addEventListener("click", async () => {
  try {
    const totalIssuesElement = document.getElementById("countIssues");
    const cardSection = document.getElementById("cardSection");
    const response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await response.json();
    const cardData = data?.data;
    totalIssuesElement.innerText = cardData?.length;
    cardSection.innerHTML = "";
    cardData.map((data) => {
      const card = `
     <div class="card bg-base-100 w-[300px] shadow-sm overflow-hidden h-[350px] flex-shrink-0 rounded-[4px] border-t-3 ${data?.priority == "low" ? "border-[#A855F7]" : "border-[#00A96E]"}">
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
    <div class="rounded-[100px] bg-[#FEECEC] text-[#EF4444] text-[12px] uppercase text-center font-[500] px-3 flex items-center gap-2">
   <div class="flex items-center gap-1">
      <img src="./images/BugDroid.png" alt="">
      <h2>${label}</h2>
   </div>
   </div>
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
});
