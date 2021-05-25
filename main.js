module.exports.responseHooks = [
  ({ response }) => {
    var responseBody = response.getBody().toString();
    var textJson = getContent(responseBody);
    var textXml = getContentAsXml(textJson);
    var prettyXml = removeCDATA(textXml);
    if (prettyXml) {
      var buffer = Buffer.from(prettyXml);
      response.setBody(buffer);
    }
  },
];

function getContent(text) {
  try {
    return (text.replace(/[<][^>]*[>]/g, ''));
  } catch {
    return null;
  }
}

function getContentAsXml(text) {
  text = text.replace("&lt;", "<").replace("&gt;", ">");
  if (text.includes('&lt') || text.includes('&gt')) {
    return getContentAsXml(text);
  }
  return text;
}

function removeCDATA(text) {
  text = text.replace("<![CDATA[", "");
  text = text.replace("]]>", "");
  return text;
}