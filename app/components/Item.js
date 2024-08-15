/** @format */

const Item = ({ title, items, key }) => {
  return (
    <>
      <div key={key}>
        <h4 style={{ textAlign: "center" }}>{title}</h4>

        {items?.map((item) => {
          return (
            <div
              style={{
                display: "flex",

                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <p>{item.label}</p>
              <p>{item.value}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Item;
