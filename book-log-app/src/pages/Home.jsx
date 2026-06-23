function Home({ user }) {
  return (
    <section className="page-section">
      <p className="eyebrow">Today's reading</p>
      <h1>Book Log</h1>
      <p className="lead">
        {user.displayName || '독자'}님의 책과 독서 기록을 차분하게 모아두는
        개인 서재입니다.
      </p>
    </section>
  )
}

export default Home
