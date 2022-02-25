export default (link: string, host: string | undefined): boolean => {
    if(!host)
        return false;
    let pat = `.*${host}.*`
    let re = new RegExp(pat, 'i');
    return re.test(link);
}