package com.mingzuozhibi.modules.core;

import com.mingzuozhibi.commons.mylog.JmsEnums;
import com.mingzuozhibi.commons.mylog.JmsEnums.Name;
import com.mingzuozhibi.commons.mylog.JmsEnums.Type;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;

import javax.persistence.criteria.Predicate;
import java.util.*;

public interface MessageRepository extends JpaRepository<Message, Long>, JpaSpecificationExecutor<Message> {

    default Page<Message> findBy(Name name, List<Type> types, String search, Pageable pageable) {
        return findAll((Specification<Message>) (root, query, cb) -> {
            ArrayList<Predicate> array = new ArrayList<>();
            array.add(cb.equal(root.get("name"), name));
            if (types != null && !types.isEmpty() && types.size() < JmsEnums.Type.values().length) {
                array.add(cb.in(root.get("type")).value(types));
            }
            if (StringUtils.isNotBlank(search)) {
                array.add(cb.like(root.get("text"), "%" + search + "%"));
            }
            return query.where(array.toArray(new Predicate[0])).getRestriction();
        }, pageable);
    }

    default int cleanup(Name name, int size, Type... typeIn) {
        if (typeIn.length == 0) typeIn = Type.values();
        int[] types = Arrays.stream(typeIn).mapToInt(Enum::ordinal).toArray();
        Long id = findTargetId(name.name(), types, size * 20);
        if (id == null) return 0;
        return deleteByTargetId(name.name(), types, id);
    }

    @Query(value = "select id from message " +
        "where name = ?1 and type in ?2 " +
        "order by id desc limit ?3,1", nativeQuery = true)
    Long findTargetId(String name, int[] types, int size);

    @Modifying
    @Query(value = "delete from message where name = ?1 and type in ?2 and id <= ?3", nativeQuery = true)
    int deleteByTargetId(String name, int[] types, Long id);

}
