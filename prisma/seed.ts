import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = [
  {
    "month": "2025-10",
    "year": 2025,
    "month_num": 10,
    "totalScore": 68.1,
    "fundingScore": 72,
    "jobPostingScore": 66,
    "newsVolumeScore": 64,
    "pollScore": 70,
    "rawFundingDeals": 14,
    "rawFundingValue": 45.2,
    "rawJobPostings": 4200,
    "rawNewsArticles": 180,
    "rawPollAvg": 3.8,
    "rawPollCount": 320,
    "commentary": "Tháng 10 năm 2025 chứng kiến sự hồi phục tích cực của hệ sinh thái khởi nghiệp Việt Nam sau giai đoạn thấp điểm mùa hè. Lượng vốn đầu tư mạo hiểm (VC) có dấu hiệu khởi sắc với một số thương vụ đáng chú ý trong lĩnh vực fintech và e-commerce nhờ dòng vốn chảy vào khu vực Đông Nam Á. Hoạt động tuyển dụng công nghệ tại các nền tảng lớn như TopCV và LinkedIn duy trì sự ổn định, phản ánh nhu cầu bổ sung nhân sự chất lượng cao của các startup đã gọi vốn thành công. Về mặt truyền thông, các cuộc thảo luận xoay quanh các giải pháp chuyển đổi số và ứng dụng công nghệ xanh bắt đầu thu hút sự quan tâm lớn từ cả báo chí trong nước lẫn quốc tế. Nhìn chung, tâm lý cộng đồng (pollScore đạt 70) thể hiện sự lạc quan thận trọng khi thị trường tài chính toàn cầu bớt biến động. Fintech vẫn là điểm sáng dẫn dắt dòng vốn, trong khi edtech và healthtech ghi nhận mức tăng trưởng chậm nhưng bền vững. Các nhà sáng lập tập trung tối ưu hóa mô hình kinh doanh thay vì chạy đua đốt tiền như trước. Đây là bước chuẩn bị quan trọng tạo đà cho các hoạt động đầu tư bùng nổ hơn vào giai đoạn cuối năm.",
    "summaryVi": "Hệ sinh thái khởi nghiệp hồi phục ổn định sau mùa hè với điểm sáng từ mảng fintech.",
    "summaryEn": "The startup ecosystem recovers steadily post-summer led by the fintech sector.",
    "sectorScores": [
      { "sector": "fintech", "score": 75, "trend": null, "summaryVi": "Hồi phục nhờ dòng vốn Đông Nam Á.", "summaryEn": "Recovering due to SEA capital inflows." },
      { "sector": "ecommerce", "score": 70, "trend": null, "summaryVi": "Tăng trưởng ổn định đầu quý 4.", "summaryEn": "Stable growth at the start of Q4." },
      { "sector": "edtech", "score": 60, "trend": null, "summaryVi": "Hoạt động gọi vốn diễn ra chậm.", "summaryEn": "Funding activity remains slow." },
      { "sector": "healthtech", "score": 58, "trend": null, "summaryVi": "Thị trường ngách phát triển ổn định.", "summaryEn": "Niche market developing steadily." },
      { "sector": "deeptech", "score": 55, "trend": null, "summaryVi": "Thu hút sự quan tâm ban đầu từ các quỹ.", "summaryEn": "Attracting initial interest from funds." }
    ]
  },
  {
    "month": "2025-11",
    "year": 2025,
    "month_num": 11,
    "totalScore": 70.2,
    "fundingScore": 76,
    "jobPostingScore": 68,
    "newsVolumeScore": 68,
    "pollScore": 67,
    "rawFundingDeals": 18,
    "rawFundingValue": 62.0,
    "rawJobPostings": 4500,
    "rawNewsArticles": 210,
    "rawPollAvg": 3.68,
    "rawPollCount": 340,
    "commentary": "Tháng 11 năm 2025 là một trong những giai đoạn sôi động nhất của quý IV với sự gia tăng mạnh mẽ về cả số lượng và giá trị các thương vụ gọi vốn. Làn sóng đầu tư vào các vòng Series A và Series B của mảng fintech lan tỏa từ Singapore và Indonesia sang Việt Nam, giúp tổng giá trị giải ngân đạt mức cao. Nhu cầu tuyển dụng kỹ sư phần mềm, chuyên gia dữ liệu và quản trị sản phẩm tăng vọt để phục vụ cho các chiến dịch kinh doanh cuối năm của khối thương mại điện tử (e-commerce). Khối lượng tin tức truyền thông bùng nổ với các sự kiện kết nối đầu tư quy mô lớn được tổ chức tại Thành phố Hồ Chí Minh và Hà Nội. Khảo sát cộng đồng cho thấy niềm tin của các founders tăng cao nhờ những tín hiệu vĩ mô tích cực từ dòng vốn ngoại. Edtech cũng ghi nhận một vài chuyển biến khả quan khi các nền tảng học tập trực tuyến tích hợp AI thu hút thêm người dùng mới. Tuy nhiên, áp lực cạnh tranh gay gắt buộc các startup deeptech phải chứng minh được giá trị thương mại hóa thực tế để thuyết phục hội đồng đầu tư.",
    "summaryVi": "Hoạt động gọi vốn và tuyển dụng tăng mạnh trong tháng sôi động nhất quý IV.",
    "summaryEn": "Funding and hiring activities surge during the most vibrant month of Q4.",
    "sectorScores": [
      { "sector": "fintech", "score": 80, "trend": 5, "summaryVi": "Bùng nổ với các thương vụ Series A/B.", "summaryEn": "Booming with Series A/B deals." },
      { "sector": "ecommerce", "score": 75, "trend": 5, "summaryVi": "Tuyển dụng tăng mạnh chuẩn bị cuối năm.", "summaryEn": "Hiring surges for year-end preparation." },
      { "sector": "edtech", "score": 62, "trend": 2, "summaryVi": "Tích hợp công nghệ AI thu hút người dùng.", "summaryEn": "AI integration attracts new users." },
      { "sector": "healthtech", "score": 60, "trend": 2, "summaryVi": "Mức đầu tư duy trì khiêm tốn.", "summaryEn": "Investment levels remain modest." },
      { "sector": "deeptech", "score": 56, "trend": 1, "summaryVi": "Áp lực chứng minh khả năng thương mại hóa.", "summaryEn": "Pressure to prove commercial viability." }
    ]
  },
  {
    "month": "2025-12",
    "year": 2025,
    "month_num": 12,
    "totalScore": 52.5,
    "fundingScore": 48,
    "jobPostingScore": 54,
    "newsVolumeScore": 52,
    "pollScore": 58,
    "rawFundingDeals": 6,
    "rawFundingValue": 12.5,
    "rawJobPostings": 2900,
    "rawNewsArticles": 110,
    "rawPollAvg": 3.32,
    "rawPollCount": 290,
    "commentary": "Đúng như dự đoán mang tính chu kỳ, tháng 12 năm 2025 ghi nhận sự chậm lại rõ rệt của toàn bộ hệ sinh thái khởi nghiệp Việt Nam. Hoạt động gọi vốn bước vào giai đoạn đóng băng cuối năm khi hầu hết các quỹ đầu tư nội địa và quốc tế ưu tiên hoàn tất các thủ tục sổ sách và đánh giá danh mục cũ hơn là giải ngân mới. Số lượng vị trí tuyển dụng công nghệ giảm sâu, do các doanh nghiệp hạn chế mở rộng quy mô nhân sự trước kỳ nghỉ Tết dài ngày. Lượng tin tức trên các phương tiện truyền thông phần lớn tập trung vào các bài viết tổng kết năm và dự báo xu hướng tương lai thay vì đưa tin về các thương vụ lớn. Điểm số từ cuộc khảo sát cộng đồng sụt giảm đáng kể do tâm lý lo ngại về dòng tiền của các startup giai đoạn đầu (early-stage). Mặc dù e-commerce vẫn duy trì doanh thu tốt nhờ mùa mua sắm lễ hội, các lĩnh vực khác như healthtech và deeptech gần như không có chuyển biến mới, phản ánh bức tranh chung ảm đạm của mùa đông gọi vốn cuối năm.",
    "summaryVi": "Thị trường bước vào giai đoạn trầm lắng theo chu kỳ chốt sổ và đóng băng gọi vốn cuối năm.",
    "summaryEn": "The market enters a seasonal slowdown with year-end book closing and funding freezes.",
    "sectorScores": [
      { "sector": "fintech", "score": 55, "trend": -25, "summaryVi": "Tạm lắng do chu kỳ chốt sổ cuối năm.", "summaryEn": "Slowdown due to year-end book-closing cycle." },
      { "sector": "ecommerce", "score": 68, "trend": -7, "summaryVi": "Giữ nhịp tốt nhờ mùa mua sắm lễ hội.", "summaryEn": "Maintained good momentum via holiday shopping." },
      { "sector": "edtech", "score": 48, "trend": -14, "summaryVi": "Hoạt động đóng băng trước kỳ nghỉ dài.", "summaryEn": "Activity freezes ahead of the long holiday." },
      { "sector": "healthtech", "score": 45, "trend": -15, "summaryVi": "Không ghi nhận thương vụ đáng chú ý nào.", "summaryEn": "No notable deals recorded." },
      { "sector": "deeptech", "score": 46, "trend": -10, "summaryVi": "Đóng băng gọi vốn tạm thời.", "summaryEn": "Temporary funding freeze." }
    ]
  },
  {
    "month": "2026-01",
    "year": 2026,
    "month_num": 1,
    "totalScore": 66.4,
    "fundingScore": 64,
    "jobPostingScore": 66,
    "newsVolumeScore": 70,
    "pollScore": 66,
    "rawFundingDeals": 11,
    "rawFundingValue": 35.8,
    "rawJobPostings": 3800,
    "rawNewsArticles": 240,
    "rawPollAvg": 3.64,
    "rawPollCount": 310,
    "commentary": "Hệ sinh thái bước vào tháng 1 năm 2026 với luồng gió lạc quan mới đầu năm. Sự bùng nổ của các mô hình trí tuệ nhân tạo (AI) trên quy mô toàn cầu đã tác động mạnh mẽ đến Việt Nam, kích thích làn sóng thành lập và chuyển đổi của các startup deeptech nội địa. Nhiều quỹ đầu tư bắt đầu công bố chiến lược giải ngân mới cho năm 2026, tập trung săn tìm các giải pháp ứng dụng AI và SaaS cho doanh nghiệp (B2B). Thị trường tuyển dụng công nghệ phục hồi nhanh chóng khi các startup ráo riết săn đón chuyên gia AI và kỹ sư machine learning. Truyền thông trong nước liên tục đưa tin về các giải pháp công nghệ tiên phong, đẩy điểm số tin tức tăng mạnh. Mặc dù vậy, giá trị dòng vốn thực tế giải ngân trong tháng vẫn chưa đạt đỉnh do tâm lý chờ đợi của các nhà đầu tư lớn trước kỳ nghỉ Tết Nguyên Đán. Lĩnh vực fintech và thương mại điện tử vẫn giữ vững phong độ ổn định, đóng vai trò là bệ đỡ vững chắc cho chỉ số VN Pulse tracker trong tháng đầu năm này.",
    "summaryVi": "Sự bùng nổ của làn sóng AI toàn cầu đem lại sinh khí mới cho các startup công nghệ sâu đầu năm.",
    "summaryEn": "The surge of the global AI wave injects new vitality into deep tech startups early this year.",
    "sectorScores": [
      { "sector": "fintech", "score": 65, "trend": 10, "summaryVi": "Tái khởi động ổn định đầu năm.", "summaryEn": "Stable restart at the beginning of the year." },
      { "sector": "ecommerce", "score": 64, "trend": -4, "summaryVi": "Duy trì phong độ làm bệ đỡ chỉ số.", "summaryEn": "Maintained performance as an index anchor." },
      { "sector": "edtech", "score": 52, "trend": 4, "summaryVi": "Kỳ vọng phục hồi sau Tết.", "summaryEn": "Expectations of recovery post-Tet." },
      { "sector": "healthtech", "score": 48, "trend": 3, "summaryVi": "Thị trường chuyển biến chậm.", "summaryEn": "Market moving slowly." },
      { "sector": "deeptech", "score": 72, "trend": 26, "summaryVi": "Bùng nổ mạnh mẽ theo làn sóng AI toàn cầu.", "summaryEn": "Strong boom following global AI wave." }
    ]
  },
  {
    "month": "2026-02",
    "year": 2026,
    "month_num": 2,
    "totalScore": 42.0,
    "fundingScore": 35,
    "jobPostingScore": 44,
    "newsVolumeScore": 42,
    "pollScore": 50,
    "rawFundingDeals": 3,
    "rawFundingValue": 5.2,
    "rawJobPostings": 1800,
    "rawNewsArticles": 95,
    "rawPollAvg": 3.0,
    "rawPollCount": 250,
    "commentary": "Tháng 2 năm 2026 là thời điểm chịu ảnh hưởng nặng nề bởi hiệu ứng Tết Nguyên Đán Bính Ngọ, khiến chỉ số VN Pulse chạm mức đáy của chu kỳ. Gần như mọi hoạt động kinh doanh, gọi vốn và tuyển dụng trên thị trường đều bị tạm dừng trong khoảng hai tuần để phục vụ kỳ nghỉ lễ truyền thống lớn nhất năm. Số lượng thương vụ gọi vốn thành công được công bố chỉ đếm trên đầu ngón tay, kéo chỉ số fundingScore xuống mức thấp kỷ lục. Các sàn tuyển dụng như VietnamWorks hay TopCV ghi nhận lượng tin đăng mới giảm sâu do tâm lý \"ra Tết mới nhảy việc\" của người lao động. Khối lượng tin tức công nghệ trên báo chí cũng sụt giảm, chủ yếu là các bài viết chúc Tết hoặc tổng hợp nhẹ nhàng. Tâm lý khảo sát từ cộng đồng (pollScore) phản ánh sự trầm lắng mang tính mùa vụ, tuy nhiên các founders không quá bi quan vì đã chủ động chuẩn bị dòng tiền từ trước. Ngoại trừ mảng e-commerce duy trì hoạt động tối thiểu để phục vụ nhu cầu mua sắm Tết, các lĩnh vực edtech, healthtech và fintech đều rơi vào trạng thái đóng băng tạm thời.",
    "summaryVi": "Chỉ số chạm đáy chu kỳ do toàn bộ hệ sinh thái tạm ngưng hoạt động trong kỳ nghỉ Tết Nguyên Đán.",
    "summaryEn": "The index hits its cyclical bottom as the entire ecosystem pauses for the Lunar New Year.",
    "sectorScores": [
      { "sector": "fintech", "score": 40, "trend": -25, "summaryVi": "Gần như đóng băng hoàn toàn do nghỉ Tết.", "summaryEn": "Almost completely frozen due to Tet holiday." },
      { "sector": "ecommerce", "score": 48, "trend": -16, "summaryVi": "Duy trì hoạt động tối thiểu cho mua sắm Tết.", "summaryEn": "Maintained minimal operation for Tet shopping." },
      { "sector": "edtech", "score": 38, "trend": -14, "summaryVi": "Hoạt động giảng dạy và học tập tạm dừng.", "summaryEn": "Teaching and learning activities paused." },
      { "sector": "healthtech", "score": 35, "trend": -13, "summaryVi": "Chạm đáy chu kỳ mùa vụ.", "summaryEn": "Hitting the seasonal cycle bottom." },
      { "sector": "deeptech", "score": 42, "trend": -30, "summaryVi": "Các dự án nghiên cứu tạm ngưng.", "summaryEn": "Research projects temporarily suspended." }
    ]
  },
  {
    "month": "2026-03",
    "year": 2026,
    "month_num": 3,
    "totalScore": 78.3,
    "fundingScore": 82,
    "jobPostingScore": 76,
    "newsVolumeScore": 74,
    "pollScore": 81,
    "rawFundingDeals": 22,
    "rawFundingValue": 94.5,
    "rawJobPostings": 5200,
    "rawNewsArticles": 280,
    "rawPollAvg": 4.24,
    "rawPollCount": 380,
    "commentary": "Tháng 3 năm 2026 chứng kiến một cú lội ngược dòng ngoạn mục với đà phục hồi mạnh mẽ nhất trong năm của hệ sinh thái khởi nghiệp Việt Nam. Ngay sau kỳ nghỉ Tết, thị trường bùng nổ với hàng loạt thương vụ đầu tư được kích hoạt trở lại, đặc biệt là trong lĩnh vực fintech và e-commerce vốn bị trì hoãn từ quý trước. Chỉ số tuyển dụng công nghệ tăng vọt khi các startup tăng tốc triển khai kế hoạch kinh doanh mới và bù đắp khoảng trống nhân sự. Tin tức về hệ sinh thái ngập tràn trên các mặt báo với các diễn đàn kết nối đầu tư và ngày hội khởi nghiệp được tổ chức liên tục. Kết quả khảo sát cộng đồng (pollScore đạt 81) thể hiện sự phấn khởi và niềm tin mãnh liệt của giới founders vào sự phục hồi của thị trường. Đáng chú ý, mảng deeptech tiếp tục thu hút sự quan tâm nhờ các sản phẩm AI thuần Việt bắt đầu được thương mại hóa thành công. Đây là tháng có tốc độ tăng trưởng chỉ số toàn diện nhất, báo hiệu một chu kỳ phát triển bùng nổ mới cho cả năm 2026.",
    "summaryVi": "Thị trường bật tăng mạnh mẽ nhất năm nhờ làn sóng gọi vốn phục hồi sau Tết.",
    "summaryEn": "The market registers its strongest bounce of the year driven by post-Tet funding recovery.",
    "sectorScores": [
      { "sector": "fintech", "score": 82, "trend": 42, "summaryVi": "Phục hồi ngoạn mục với nhiều thương vụ trì hoãn.", "summaryEn": "Spectacular recovery with delayed deals." },
      { "sector": "ecommerce", "score": 76, "trend": 28, "summaryVi": "Bùng nổ tuyển dụng và ưu đãi sau Tết.", "summaryEn": "Hiring and promotions boom post-Tet." },
      { "sector": "edtech", "score": 65, "trend": 27, "summaryVi": "Tăng trưởng mạnh mẽ trở lại.", "summaryEn": "Strong growth returns." },
      { "sector": "healthtech", "score": 60, "trend": 25, "summaryVi": "Dòng vốn giải ngân đều đặn trở lại.", "summaryEn": "Capital flows resume steady disbursement." },
      { "sector": "deeptech", "score": 78, "trend": 36, "summaryVi": "Bứt phá nhờ sản phẩm AI nội địa ra mắt.", "summaryEn": "Breakthrough with local AI product launches." }
    ]
  },
  {
    "month": "2026-04",
    "year": 2026,
    "month_num": 4,
    "totalScore": 75.6,
    "fundingScore": 74,
    "jobPostingScore": 72,
    "newsVolumeScore": 84,
    "pollScore": 72,
    "rawFundingDeals": 16,
    "rawFundingValue": 58.0,
    "rawJobPostings": 4900,
    "rawNewsArticles": 390,
    "rawPollAvg": 3.88,
    "rawPollCount": 410,
    "commentary": "Tháng 4 năm 2026 là một mốc son quan trọng với hàng loạt thông tin vĩ mô cực kỳ tích cực thúc đẩy hệ sinh thái Việt Nam. Điểm nhấn lớn nhất là việc Chính phủ ban hành Nghị quyết số 86/NQ-CP về chiến lược quốc gia cho startup đổi mới sáng tạo, vạch ra lộ trình thành lập sàn giao dịch chứng khoán riêng cho startup và thí điểm cơ chế \"one-person startup\". Đồng thời, Thành phố Hồ Chí Minh chính thức ra mắt Quỹ đầu tư mạo hiểm trị giá 500 tỷ đồng (PPP), giải quyết bài toán vốn mồi giai đoạn sớm. Những thông tin này thúc đẩy khối lượng tin tức truyền thông (newsVolumeScore) tăng vọt lên mức 84. Doanh thu công nghệ số của Việt Nam trong tháng cũng đạt con số ấn tượng 23,6 tỷ USD. Niềm tin thị trường được củng cố mạnh mẽ, thúc đẩy dòng vốn VC giải ngân đều đặn vào fintech và deeptech. Hoạt động tuyển dụng giữ vững nhịp độ cao khi các doanh nghiệp tự tin mở rộng nhờ bệ đỡ chính sách vững chắc. Các lĩnh vực edtech và healthtech cũng hưởng lợi trực tiếp từ định hướng tích hợp giáo dục khởi nghiệp của Chính phủ.",
    "summaryVi": "Hệ sinh thái bứt phá nhờ tác động lịch sử của Nghị quyết 86/NQ-CP và việc thành lập Quỹ VC TP.HCM.",
    "summaryEn": "The ecosystem surges following the historic impact of Resolution 86/NQ-CP and the launch of the HCMC VC Fund.",
    "sectorScores": [
      { "sector": "fintech", "score": 78, "trend": -4, "summaryVi": "Duy trì dòng vốn VC ổn định.", "summaryEn": "Maintained stable VC capital inflows." },
      { "sector": "ecommerce", "score": 74, "trend": -2, "summaryVi": "Doanh thu số tăng trưởng vượt bậc.", "summaryEn": "Digital revenue shows exceptional growth." },
      { "sector": "edtech", "score": 68, "trend": 3, "summaryVi": "Hưởng lợi từ định hướng giáo dục khởi nghiệp mới.", "summaryEn": "Benefiting from new startup education focus." },
      { "sector": "healthtech", "score": 62, "trend": 2, "summaryVi": "Các startup mở rộng quy mô nhờ chính sách nâng đỡ.", "summaryEn": "Startups scale up due to supportive policy." },
      { "sector": "deeptech", "score": 82, "trend": 4, "summaryVi": "Bùng nổ nhờ Nghị quyết 86 và Quỹ HCMC.", "summaryEn": "Surging due to Resolution 86 and HCMC Fund." }
    ]
  }
]

async function main() {
  console.log('Starting seed...')

  for (const { sectorScores, ...indexData } of seedData) {
    const index = await prisma.monthlyIndex.upsert({
      where: { month: indexData.month },
      update: indexData,
      create: indexData,
    })

    console.log(`Upserted MonthlyIndex: ${index.month} (id: ${index.id})`)

    for (const s of sectorScores) {
      await prisma.sectorScore.upsert({
        where: { indexId_sector: { indexId: index.id, sector: s.sector } },
        update: { score: s.score, trend: s.trend },
        create: { indexId: index.id, ...s },
      })
    }

    console.log(`  → Upserted ${sectorScores.length} sector scores`)
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
